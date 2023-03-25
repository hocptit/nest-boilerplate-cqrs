import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { LoggerService } from '@libs/shared/modules/loggers/logger.service';
import { IResponse } from '@libs/infra/interceptors';
import {
  BusinessException,
  convertGrpcExceptionToHttpException,
  isExceptionGRPC,
} from '@libs/shared';
import { IResponseRawRpcException } from '@libs/shared/exception/exception.grpc';

@Catch()
export class HttpUnknownExceptionsFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LoggerService) {}

  private logger = this.loggingService.getLogger('unknown-exception');
  private loggerGrpc = this.loggingService.getLogger('grpc-exception');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let defaultResponse: IResponse<any>;
    if (isExceptionGRPC(exception)) {
      const convertGrpcException = convertGrpcExceptionToHttpException(
        exception as IResponseRawRpcException,
      );
      if (convertGrpcException instanceof BusinessException) {
        this.loggerGrpc.error(convertGrpcException.getResponse());
        defaultResponse = {
          data: null,
          validatorErrors: [],
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'internal server error',
          success: false,
        };
      } else {
        defaultResponse = convertGrpcException.getResponse() as IResponse<any>;
        this.loggerGrpc.warn(defaultResponse);
      }
    } else {
      this.logger.error(exception);
      defaultResponse = {
        data: null,
        validatorErrors: [],
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        message: 'internal server error',
        success: false,
      };
    }
    response.status(defaultResponse.statusCode).json(defaultResponse);
  }
}
