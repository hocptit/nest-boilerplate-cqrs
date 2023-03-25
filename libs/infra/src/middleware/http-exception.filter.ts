import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import * as exc from '@libs/shared/exception';
import { LoggerService } from '@libs/shared/modules/loggers/logger.service';
import { IResponse } from '@libs/infra/interceptors';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LoggerService) {}

  private logger = this.loggingService.getLogger('http-exception');

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let excResponse = exception.getResponse() as IResponse<any> | any;
    this.logger.warn(excResponse);
    // todo: handle convert exception
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
