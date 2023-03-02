import { HttpException, HttpStatus } from '@nestjs/common';
import { RequestContextService } from 'infra/application/context/AppRequestContext';

import {
  defaultResponse,
  IResponse,
} from 'infra/interceptors/request-response.interceptor';

export abstract class BaseException<TData> extends HttpException {
  protected constructor(partial: IResponse<TData>, statusCode: number) {
    const payload = {
      ...defaultResponse,
      statusCode: partial?.statusCode ? partial.statusCode : statusCode,
      message: '',
      ...partial,
      requestId: RequestContextService.getRequestId(),
    };
    payload.success = payload.statusCode < 400;
    super(payload, statusCode);
  }
}

/**
 * response to client an error
 * @example
 * throw new exc.Exception<number>({
    message: 'Not found user id',
  });
 */
export class Exception<TData> extends BaseException<TData> {
  constructor(
    payload: IResponse<TData>,
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(payload, statusCode);
  }
}

export class BadRequestException<TData> extends BaseException<TData> {
  constructor(payload: IResponse<TData>) {
    super(payload, HttpStatus.BAD_REQUEST);
  }
}

export class BusinessException<TData> extends BaseException<TData> {
  constructor(payload: IResponse<TData>) {
    super(payload, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class Unauthorized<TData> extends BaseException<TData> {
  constructor(payload: IResponse<TData>) {
    super(payload, HttpStatus.UNAUTHORIZED);
  }
}

export class Forbidden<TData> extends BaseException<TData> {
  constructor(payload: IResponse<TData>) {
    super(payload, HttpStatus.FORBIDDEN);
  }
}

export class NotFound<TData> extends BaseException<TData> {
  constructor(payload: IResponse<TData>) {
    super(payload, HttpStatus.NOT_FOUND);
  }
}

export class MethodNotAllowed<TData> extends BaseException<TData> {
  constructor(payload: IResponse<TData>) {
    super(payload, HttpStatus.METHOD_NOT_ALLOWED);
  }
}

export class NotAcceptable<TData> extends BaseException<TData> {
  constructor(payload: IResponse<TData>) {
    super(payload, HttpStatus.NOT_ACCEPTABLE);
  }
}

export class Conflict<TData> extends BaseException<TData> {
  constructor(payload: IResponse<TData>) {
    super(payload, HttpStatus.CONFLICT);
  }
}

export class UnsupportedMediaType<TData> extends BaseException<TData> {
  constructor(payload: IResponse<TData>) {
    super(payload, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
  }
}

export class TemporaryRedirect<TData> extends BaseException<TData> {
  constructor(payload: IResponse<TData>) {
    super(payload, HttpStatus.TEMPORARY_REDIRECT);
  }
}

export class PayloadTooLarge<TData> extends BaseException<TData> {
  constructor(payload: IResponse<TData>) {
    super(payload, HttpStatus.PAYLOAD_TOO_LARGE);
  }
}

export class FailedDependency<TData> extends BaseException<TData> {
  constructor(payload: IResponse<TData>) {
    super(payload, HttpStatus.FAILED_DEPENDENCY);
  }
}
