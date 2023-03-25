import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { RedisContext, RmqContext, TcpContext } from '@nestjs/microservices';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Metadata } from '@grpc/grpc-js';
import {
  createResponse,
  IResponse,
} from '@libs/infra/interceptors/request-response.interceptor';
import { LoggerService } from '@libs/shared';
import { EEnvKey } from '@libs/configs/env.constant';
import { ConfigService } from '@nestjs/config';

export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  constructor(
    private readonly loggingService: LoggerService,
    private readonly configService: ConfigService,
  ) {}
  private logger = this.loggingService.getLogger('Request');
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    const nodeEnv = this.configService.get(EEnvKey.NODE_ENV);
    if (nodeEnv === 'debug') {
      this.logger.info(context);
    }
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse<Response>();
        // For Microservice
        if (
          response instanceof TcpContext ||
          response instanceof RedisContext ||
          response instanceof RmqContext
        ) {
          //todo: implement
          throw Error('Not support yet');
        }
        if (response instanceof Metadata) {
          return data;
        }
        // For Http RestAPI
        if (nodeEnv === 'debug') {
          const request = context.switchToHttp().getRequest();
          this.logger.info(
            request.headers,
            request.query,
            request.params,
            request.url,
            request.body,
          );
        }
        const responseData = createResponse(data);
        response.status(responseData.statusCode);
        return createResponse(data);
      }),
    );
  }
}
