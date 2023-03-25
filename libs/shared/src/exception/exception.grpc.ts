import { Metadata, status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';
import { Status } from '@grpc/grpc-js/build/src/constants';

export interface IResponseRpcException {
  details: IRpcException;
  code: Status;
  metadata: Metadata;
}

export interface IResponseRawRpcException {
  details: string;
  code: Status;
  metadata: Metadata;
}
export interface IPayloadRpcException<T> {
  message: string;
  code: Status;
  errorCode?: string;
  errorDetails?: T[];
}

type IRpcException = Omit<IPayloadRpcException<unknown>, 'code'>;

export abstract class BaseRpcException extends RpcException {
  protected constructor(payload: IPayloadRpcException<any>) {
    super({
      // must have, because only code auto map to grpc status, message map to field details
      exception: {
        message: payload.message,
        errorCode: payload.errorCode,
        errorDetails: payload.errorDetails,
      },
      code: payload.code,
    });
  }
}
export class NotFoundRpcException extends BaseRpcException {
  constructor(exception: IRpcException) {
    super({ ...exception, code: status.NOT_FOUND });
  }
}

export class InternalRpcException extends BaseRpcException {
  constructor(exception: IRpcException) {
    super({ ...exception, code: status.INTERNAL });
  }
}

export class BadRequestRpcException extends BaseRpcException {
  constructor(exception: IRpcException) {
    super({ ...exception, code: status.INVALID_ARGUMENT });
  }
}

export class UnsupportedMediaTypeRpcException extends BaseRpcException {
  constructor(exception: IRpcException) {
    super({
      ...exception,
      code: status.UNKNOWN,
    });
  }
}

export class ForbiddenRpcException extends BaseRpcException {
  constructor(exception: IRpcException) {
    super({ ...exception, code: status.PERMISSION_DENIED });
  }
}

export class ConflictRpcException extends BaseRpcException {
  constructor(exception: IRpcException) {
    super({ ...exception, code: status.ALREADY_EXISTS });
  }
}

export class RequestTimeoutRpcException extends BaseRpcException {
  constructor(exception: IRpcException) {
    super({ ...exception, code: status.DEADLINE_EXCEEDED });
  }
}

export class UnauthorizedRpcException extends BaseRpcException {
  constructor(exception: IRpcException) {
    super({ ...exception, code: status.UNAUTHENTICATED });
  }
}

export class NotImplementedRpcException extends BaseRpcException {
  constructor(exception: IRpcException) {
    super({ ...exception, code: status.UNIMPLEMENTED });
  }
}

export class PayloadTooLargeRpcException extends BaseRpcException {
  constructor(exception: IRpcException) {
    super({ ...exception, code: status.OUT_OF_RANGE });
  }
}

export class ValidationRpcException extends BaseRpcException {
  constructor(exception: IRpcException) {
    super({ ...exception, code: status.FAILED_PRECONDITION });
  }
}

export class ServiceUnavailableRpcException extends RpcException {
  constructor(exception: IRpcException) {
    super({ ...exception, code: status.UNAVAILABLE });
  }
}
