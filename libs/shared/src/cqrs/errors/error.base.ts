export interface SerializedError {
  message: string;
  code: string;
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
  abstract code: string;

  public readonly correlationId: string;

  /**
   * @param {string} message
   * @param {ObjectLiteral} [metadata={}]
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
      code: this.code,
      stack: this.stack,
      cause: JSON.stringify(this.cause),
      metadata: this.metadata,
    };
  }
}
