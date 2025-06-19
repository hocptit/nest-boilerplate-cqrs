import { Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ArticlesService } from '../services/article.service';
import { ObjectIDDto } from '@shared/dtos/ObjectID.dto';
import { routesV1 } from 'app.routes';
import { Controller, Get, List } from '@shared/decorators/mixin.decorators';
import { ApiOkResponsePayload, EApiOkResponsePayload } from 'infra/swagger';
import { ArticleSchema } from '../domain/models/schemas/Article.schema';
import { ListArticleDto } from '../dtos/ListArticle.dto';

/**
 * Controller responsible for handling article query operations.
 * Implements CQRS pattern by separating query operations from commands.
 *
 * @class ArticleQueriesController
 */
@Controller(routesV1.article.root)
@UsePipes(new ValidationPipe())
export class ArticleQueriesController {
  /**
   * Creates an instance of ArticleQueriesController.
   *
   * @param {ArticlesService} articleService - Service for handling article operations
   */
  constructor(private readonly articleService: ArticlesService) {}
  /**
   * Retrieves a list of articles based on query parameters.
   *
   * @param {ListArticleDto} listArticleDto - Query parameters for filtering and pagination
   * @returns {Promise<ArticleSchema[]>} Array of articles matching the criteria
   *
   * @example
   * GET /api/articles?page=1&limit=10&search=technology
   */
  @List(routesV1.article.queries.getAll.route, {
    summary: routesV1.article.queries.getAll.summary,
  })
  @ApiOkResponsePayload(ArticleSchema, EApiOkResponsePayload.ARRAY)
  async findArticles(@Query() listArticleDto: ListArticleDto) {
    return this.articleService.findAll(listArticleDto);
  }

  /**
   * Retrieves a single article by its ID.
   *
   * @param {ObjectIDDto} params - Parameters containing the article ID
   * @returns {Promise<ArticleSchema>} The article with the specified ID
   *
   * @example
   * GET /api/articles/507f1f77bcf86cd799439011
   */
  @Get(routesV1.article.queries.getArticleById.route, {
    summary: routesV1.article.queries.getArticleById.summary,
  })
  @ApiOkResponsePayload(ArticleSchema, EApiOkResponsePayload.OBJECT)
  async findArticleById(@Param() params: ObjectIDDto) {
    return this.articleService.findById(params.id);
  }
}
