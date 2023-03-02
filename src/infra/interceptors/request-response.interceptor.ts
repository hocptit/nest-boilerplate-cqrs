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
import { LoggerService } from '@shared/modules/loggers/logger.service';

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
  constructor(private readonly loggingService: LoggerService) {}
  private logger = this.loggingService.getLogger('Request');
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    const request = context.switchToHttp().getRequest();
    this.logger.info(request.headers, request.query, request.params);
    //todo: optimize logger body hidden password
    try {
      let body = request?.body;
      if (body && body instanceof Object) {
        body = JSON.parse(JSON.stringify(request?.body));
        if (body?.password) {
          this.logger.info(`Hidden password`);
          delete body.password;
        }
        this.logger.info(`Body: `, body);
      }
    } catch (e) {}
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
