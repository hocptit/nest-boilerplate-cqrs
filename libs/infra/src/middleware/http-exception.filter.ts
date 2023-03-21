import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import * as exc from '@libs/shared/exception';
import { IResponse } from '../interceptors/request-response.interceptor';
import { LoggerService } from '@libs/shared/modules/loggers/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LoggerService) {}

  private logger = this.loggingService.getLogger('http-exception');

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let excResponse = exception.getResponse() as IResponse<any> | any;
    if (
      typeof excResponse !== 'object' ||
      !excResponse.hasOwnProperty('success')
    ) {
      let newDataResponse: Record<string, any> =
        typeof excResponse === 'object'
          ? excResponse
          : { message: excResponse };
      newDataResponse = newDataResponse?.message;
      excResponse = new exc.BadRequestException({
        statusCode: excResponse.statusCode
          ? excResponse.statusCode
          : HttpStatus.BAD_REQUEST,
        data: excResponse.data ? excResponse.data : null,
        validatorErrors: excResponse?.validatorErrors
          ? excResponse.validatorErrors
          : [],
        message:
          typeof newDataResponse === 'string'
            ? newDataResponse
            : 'unknown message',
      }).getResponse();
    }
    response.status(excResponse.statusCode).json(excResponse);
  }
}
