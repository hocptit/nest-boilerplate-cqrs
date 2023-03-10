import { Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ArticlesService } from '../services/article.service';
import { ObjectIDDto } from '@shared/dtos/ObjectID.dto';
import { routesV1 } from 'app.routes';
import { Controller, Get, List } from '@shared/decorators/mixin.decorators';
import { ApiOkResponsePayload, EApiOkResponsePayload } from 'infra/swagger';
import {  ArticleSchema } from '../domain/models/schemas/Article.schema';
import { ListArticleDto } from '../dtos/ListArticle.dto';

@Controller(routesV1.article.root)
@UsePipes(new ValidationPipe())
export class ArticleQueriesController {
  constructor(private readonly articleService: ArticlesService) {}
  @List(routesV1.article.queries.getAll.route, {
    summary: routesV1.article.queries.getAll.summary,
  })
  @ApiOkResponsePayload(ArticleSchema, EApiOkResponsePayload.ARRAY)
  async findArticles(@Query() listArticleDto: ListArticleDto) {
    return this.articleService.findAll(listArticleDto);
  }

  @Get(routesV1.article.queries.getArticleById.route, {
    summary: routesV1.article.queries.getArticleById.summary,
  })
  @ApiOkResponsePayload(ArticleSchema, EApiOkResponsePayload.OBJECT)
  async findArticleById(@Param() params: ObjectIDDto) {
    return this.articleService.findById(params.id);
  }
}
