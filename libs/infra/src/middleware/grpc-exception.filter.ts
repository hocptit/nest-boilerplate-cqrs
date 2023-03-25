import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { LoggerService } from '@libs/shared';
import {
  BaseRpcException,
  IPayloadRpcException,
  IResponseRawRpcException,
} from '@libs/shared/exception/exception.grpc';
import { Status } from '@grpc/grpc-js/build/src/constants';

@Catch(RpcException)
export class GrpcExceptionFilter implements RpcExceptionFilter<RpcException> {
  constructor(private readonly loggingService: LoggerService) {}
  private logger = this.loggingService.getLogger('microservice-exception');
  catch(exception: BaseRpcException): Observable<IResponseRawRpcException> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const error: IPayloadRpcException<any> = exception.getError()?.exception;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const code: Status = exception.getError()?.code;
    this.logger.warn(exception.getError());
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const defaultResponse = {
      message: JSON.stringify({
        errorDetails: error?.errorDetails,
        message: error?.message,
        errorCode: error?.errorCode,
      }),
      code: code,
    };
    return new Observable((subscriber) => {
      subscriber.error(defaultResponse);
      subscriber.complete();
    });
  }
}
