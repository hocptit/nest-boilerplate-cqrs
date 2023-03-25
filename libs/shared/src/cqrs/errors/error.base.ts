export interface SerializedError {
  message: string;
  errorCode: string;
  stack?: string;
  cause?: string;
  metadata?: unknown;
}

/**
 * Base class for custom exceptions.
 *
 * @abstract
 * @class ExceptionBase
 * @extends {Error}
 */
export abstract class BaseError extends Error {
  public errorCode: string;

  public readonly correlationId: string;

  /**
   * @param {string} message
   * @param cause
   * @param {Object} [metadata={}]
   */
  constructor(
    readonly message: string,
    readonly cause?: Error,
    readonly metadata?: unknown,
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
  toJSON(): SerializedError {
    return {
      message: this.message,
      errorCode: this.errorCode,
      stack: this.stack,
      cause: JSON.stringify(this.cause),
      metadata: this.metadata,
    };
  }
}
