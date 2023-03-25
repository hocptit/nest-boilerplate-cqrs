import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoggerService } from '@libs/shared/modules/loggers/logger.service';
import { EEnvKey } from '@libs/configs/env.constant';
import { ConfigService } from '@nestjs/config';

export const defaultResponse: IResponse<[]> = {
  success: true,
  statusCode: HttpStatus.OK,
  message: '',
  data: null,
  validatorErrors: [],
};

export interface IResponse<T> {
  statusCode?: HttpStatus;
  data?: T;
  _metadata?: {
    [key: string]: any;
  };
  message?: string | null;
  success?: boolean;
  validatorErrors?: any[];
  errorCode?: string;
}
export function createResponse<T>(data: any): IResponse<T> {
  return {
    statusCode: data?.statusCode ? data.statusCode : HttpStatus.OK,
    data: data?.data || data || [],
    _metadata: data?._metadata
      ? { ...data._metadata, timestamp: new Date() }
      : { timestamp: new Date() },
    success: true,
    message: data?.message ? data?.message : '',
  };
}
@Injectable()
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
      const request = context.switchToHttp().getRequest();
      this.logger.info(
        request.headers,
        request.query,
        request.params,
        request.url,
        request.body,
      );
    }
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse<Response>();
        const responseData = createResponse(data);
        response.status(responseData.statusCode);
        return createResponse(data);
      }),
    );
  }
}
