import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindManyArticlesQuery } from '../cqrs/queries/impl/find-many-article.query';
import { CreateArticleDto } from '../dtos/CreateArticle.dto';
import { CreateArticleCommand } from '../cqrs/commands/impl/create-article.command';
import { ArticleDocument } from '@modules/article/domain/models/schemas/Article.schema';
import { FindSingleArticleQuery } from '../cqrs/queries/impl/find-single-article.query';
import { AggregateID } from '../../../shared/cqrs/aggregate_root_base/aggregate-root.base';
import { BaseResponseCommand } from '@shared/types/response-command.base';
import { ListArticleDto } from '../dtos/ListArticle.dto';
import { BaseService } from '@shared/services/base.service';

/**
 * Service responsible for handling article-related business operations.
 * Implements CQRS pattern by delegating to command and query handlers.
 * Extends BaseService to inherit common error handling and CQRS operations.
 *
 * @class ArticlesService
 * @extends {BaseService}
 */
@Injectable()
export class ArticlesService extends BaseService {
  /**
   * Creates an instance of ArticlesService.
   *
   * @param {CommandBus} commandBus - NestJS CQRS command bus for executing commands
   * @param {QueryBus} queryBus - NestJS CQRS query bus for executing queries
   */
  constructor(commandBus: CommandBus, queryBus: QueryBus) {
    super(commandBus, queryBus);
  }

  /**
   * Creates a new article using the CQRS command pattern.
   *
   * @param {CreateArticleDto} dto - Data transfer object containing article creation data
   * @returns {Promise<BaseResponseCommand>} Response containing the created article ID
   * @throws {BadRequestException} When article creation fails due to business rules
   *
   * @example
   * const result = await articlesService.createArticle({
   *   title: 'My Article',
   *   content: 'Article content here...'
   * });
   */
  async createArticle(dto: CreateArticleDto): Promise<BaseResponseCommand> {
    const id = await this.executeCommand<AggregateID, Error>(
      new CreateArticleCommand(dto),
    );
    return { id };
  }

  /**
   * Retrieves a list of articles based on query parameters.
   *
   * @param {ListArticleDto} listArticleDto - Query parameters for filtering and pagination
   * @returns {Promise<ArticleDocument[]>} Array of articles matching the criteria
   * @throws {BadRequestException} When the query fails due to invalid parameters
   *
   * @example
   * const articles = await articlesService.findAll({
   *   page: 1,
   *   limit: 10,
   *   search: 'technology'
   * });
   */
  async findAll(listArticleDto: ListArticleDto): Promise<ArticleDocument[]> {
    return this.executeQuery<ArticleDocument[], Error>(
      new FindManyArticlesQuery(listArticleDto),
    );
  }

  /**
   * Retrieves a single article by its ID.
   *
   * @param {string} id - The unique identifier of the article
   * @returns {Promise<ArticleDocument>} The article with the specified ID
   * @throws {BadRequestException} When the article is not found or ID is invalid
   *
   * @example
   * const article = await articlesService.findById('507f1f77bcf86cd799439011');
   */
  async findById(id: string): Promise<ArticleDocument> {
    return this.executeQuery<ArticleDocument, Error>(
      new FindSingleArticleQuery(id),
    );
  }
}
