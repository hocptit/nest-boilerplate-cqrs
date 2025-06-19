import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Result, match } from 'oxide.ts';
import { BadRequestException } from '@shared/exception';
import { ENotFoundArticle } from '@modules/article/domain/article.error';

/**
 * Base service class that provides common CQRS operations and error handling.
 * This class reduces code duplication across different domain services.
 * 
 * @abstract
 * @class BaseService
 */
@Injectable()
export abstract class BaseService {
  /**
   * Creates an instance of BaseService.
   * 
   * @param {CommandBus} commandBus - NestJS CQRS command bus for executing commands
   * @param {QueryBus} queryBus - NestJS CQRS query bus for executing queries
   */
  constructor(
    protected readonly commandBus: CommandBus,
    protected readonly queryBus: QueryBus,
  ) {}

  /**
   * Executes a command and handles the result with proper error handling.
   * 
   * @template TResult - The type of the successful result
   * @template TError - The type of the error
   * @param {any} command - The command to execute
   * @returns {Promise<TResult>} The result of the command execution
   * @throws {BadRequestException} When a domain error occurs
   * @throws {Error} When an unexpected error occurs
   */
  protected async executeCommand<TResult, TError extends Error>(
    command: any,
  ): Promise<TResult> {
    const result: Result<TResult, TError> = await this.commandBus.execute(command);
    return this.handleResult(result);
  }

  /**
   * Executes a query and handles the result with proper error handling.
   * 
   * @template TResult - The type of the successful result
   * @template TError - The type of the error
   * @param {any} query - The query to execute
   * @returns {Promise<TResult>} The result of the query execution
   * @throws {BadRequestException} When a domain error occurs
   * @throws {Error} When an unexpected error occurs
   */
  protected async executeQuery<TResult, TError extends Error>(
    query: any,
  ): Promise<TResult> {
    const result: Result<TResult, TError> = await this.queryBus.execute(query);
    return this.handleResult(result);
  }

  /**
   * Handles the Result type and converts errors to appropriate exceptions.
   * 
   * @private
   * @template TResult - The type of the successful result
   * @template TError - The type of the error
   * @param {Result<TResult, TError>} result - The result to handle
   * @returns {TResult} The successful result
   * @throws {BadRequestException} When a domain error occurs
   * @throws {Error} When an unexpected error occurs
   */
  private handleResult<TResult, TError extends Error>(
    result: Result<TResult, TError>,
  ): TResult {
    return match(result, {
      Ok: (value: TResult): TResult => value,
      Err: (error: TError) => {
        if (this.isDomainError(error)) {
          throw new BadRequestException({ message: error.message });
        }
        throw error;
      },
    });
  }

  /**
   * Determines if an error is a domain-specific error that should be converted
   * to a BadRequestException.
   * 
   * @private
   * @param {Error} error - The error to check
   * @returns {boolean} True if the error is a domain error
   */
  private isDomainError(error: Error): boolean {
    // Add more domain error types as needed
    return error instanceof ENotFoundArticle;
  }
}
