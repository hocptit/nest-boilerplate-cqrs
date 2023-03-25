import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  RpcExceptionFilter,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { RedisContext, RmqContext, TcpContext } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';
import { IResponse } from '@libs/infra/interceptors';
import { LoggerService } from '@libs/shared';
import { Status } from '@grpc/grpc-js/build/src/constants';

const configService = new ConfigService();

@Catch()
export class UnknownExceptionsFilter
  implements ExceptionFilter, RpcExceptionFilter
{
  constructor(private readonly loggingService: LoggerService) {}

  private logger = this.loggingService.getLogger('unknown-exception');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    if (
      response instanceof TcpContext ||
      response instanceof RedisContext ||
      response instanceof RmqContext ||
      response instanceof Metadata
    ) {
      this.logger.error(exception);
      let defaultResponse;
      if (response instanceof TcpContext || response instanceof RmqContext) {
        this.logger.error(`Error in pattern: ${response.getPattern()}`);
      } else if (response instanceof RedisContext) {
      } else {
        defaultResponse = {
          message: JSON.stringify({
            errorDetails: [],
            message:
              typeof exception === 'object' && exception?.message
                ? exception.message
                : 'internal server error',
          }),
          code: Status.UNKNOWN,
        };
      }
      return new Observable((subscriber) => {
        subscriber.error(defaultResponse);
        subscriber.complete();
      });
    } else {
      this.logger.error(exception);
      let defaultResponse: IResponse<any> = {};
      defaultResponse = {
        data: null,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'internal server error',
        success: false,
      };
      return response.status(defaultResponse.statusCode).json(defaultResponse);
    }
  }
}
