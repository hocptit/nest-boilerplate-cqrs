import { join } from 'path';
import {
  IResponseRawRpcException,
  IResponseRpcException,
} from '@libs/shared/exception/exception.grpc';
import {
  BadRequestException,
  BaseException,
  BusinessException,
  Forbidden,
  Unauthorized,
} from '@libs/shared/exception';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { IResponse } from '@libs/infra/interceptors';

export function getProtoPath(serviceName: string, protoName: string): string {
  return join(__dirname, '../../../assets/proto', serviceName, protoName);
}

export function isExceptionGRPC(exception: unknown): boolean {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return exception?.metadata?.internalRepr
    ?.get('content-type')
    ?.includes('application/grpc+proto');
}

export function convertGrpcException(
  exception: IResponseRawRpcException,
): IResponseRpcException {
  let details;
  try {
    details = JSON.parse(exception?.details);
  } catch (e) {
    details = {};
  }
  return {
    details: details,
    code: exception.code,
    metadata: exception?.metadata,
  };
}

export function convertGrpcExceptionToHttpException(
  exception: IResponseRawRpcException,
): BaseException<any> {
  const grpcException = convertGrpcException(exception);
  const payload: IResponse<any> = {
    message: grpcException.details?.message,
    errorCode: grpcException.details?.errorCode,
    validatorErrors: grpcException.details?.errorDetails
      ? grpcException.details?.errorDetails
      : [],
  };
  switch (grpcException.code) {
    // case Status.OK:
    case Status.CANCELLED:
    case Status.FAILED_PRECONDITION:
    case Status.ALREADY_EXISTS:
    case Status.INVALID_ARGUMENT:
    case Status.UNAVAILABLE:
    case Status.UNIMPLEMENTED:
    case Status.OUT_OF_RANGE:
    case Status.ABORTED:
    case Status.RESOURCE_EXHAUSTED:
    case Status.NOT_FOUND:
      return new BadRequestException(payload);
    case Status.PERMISSION_DENIED:
      return new Forbidden(payload);
    case Status.DEADLINE_EXCEEDED:
    case Status.INTERNAL:
      return new BusinessException(payload);
    case Status.DATA_LOSS:
    case Status.UNAUTHENTICATED:
      return new Unauthorized(payload);
    case Status.UNKNOWN:
      return new BusinessException(payload);
  }
}
