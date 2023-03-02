import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { IResponse } from 'infra/interceptors/request-response.interceptor';
import { LoggerService } from '@shared/modules/loggers/logger.service';

@Catch()
export class UnknownExceptionsFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LoggerService) {}

  private logger = this.loggingService.getLogger('unknown-exception');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    this.logger.error(exception);

    const defaultResponse: IResponse<any> = {
      data: null,
      validatorErrors: [],
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      message:
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        typeof exception === 'object' && exception?.message
          ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            exception?.message
          : 'unknown exception',
      success: false,
    };
    response.status(defaultResponse.statusCode).json(defaultResponse);
  }
}
