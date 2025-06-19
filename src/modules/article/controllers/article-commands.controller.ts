import { Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ArticlesService } from '../services/article.service';
import { CreateArticleDto } from '../dtos/CreateArticle.dto';
import { routesV1 } from '../../../app.routes';
import { Controller, Post } from '@shared/decorators/mixin.decorators';
import { ApiOkResponsePayload, EApiOkResponsePayload } from 'infra/swagger';
import { BaseResponseCommand } from '../../../shared/types/response-command.base';

/**
 * Controller responsible for handling article command operations.
 * Implements CQRS pattern by separating command operations from queries.
 *
 * @class ArticleCommandsController
 */
@Controller(routesV1.article.root)
@UsePipes(new ValidationPipe())
export class ArticleCommandsController {
  /**
   * Creates an instance of ArticleCommandsController.
   *
   * @param {ArticlesService} articlesService - Service for handling article operations
   */
  constructor(private readonly articlesService: ArticlesService) {}

  /**
   * Creates a new article.
   *
   * @param {CreateArticleDto} articleDto - Data transfer object containing article creation data
   * @returns {Promise<BaseResponseCommand>} Response containing the created article ID
   *
   * @example
   * POST /api/articles
   * {
   *   "title": "Sample Article",
   *   "content": "Article content here"
   * }
   */
  @Post(routesV1.article.commands.createArticle.route, {
    summary: routesV1.article.commands.createArticle.summary,
  })
  @ApiOkResponsePayload(BaseResponseCommand, EApiOkResponsePayload.OBJECT)
  async createArticle(@Body() articleDto: CreateArticleDto) {
    return this.articlesService.createArticle(articleDto);
  }
}
