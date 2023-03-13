import { Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ArticlesService } from '../services/article.service';
import { ObjectIDDto } from '@shared/dtos/ObjectID.dto';
import { routesV1 } from 'app.routes';
import { Controller, Get, List } from '@shared/decorators/mixin.decorators';
import { ApiOkResponsePayload, EApiOkResponsePayload } from 'infra/swagger';
import { ArticleSchema } from '../domain/models/schemas/Article.schema';
import { ListArticleDto } from '../dtos/ListArticle.dto';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';

@Controller(routesV1.article.root)
@UsePipes(new ValidationPipe())
export class ArticleQueriesController {
  constructor(
    private readonly articleService: ArticlesService,
    @InjectSentry() private readonly client: SentryService,
  ) {}
  @List(routesV1.article.queries.getAll.route, {
    summary: routesV1.article.queries.getAll.summary,
  })
  @ApiOkResponsePayload(ArticleSchema, EApiOkResponsePayload.ARRAY)
  async findArticles(@Query() listArticleDto: ListArticleDto) {
    // this.client.instance().captureMessage(listArticleDto.content);
    // this.client.instance().captureException(new Error(listArticleDto.content));

    this.client.log('AppService Loaded', 'test', true); // creates log asBreadcrumb //
    this.client.instance().setUser({
      username: 'nameUser',
    });
    this.client.setContext('chara');
    this.client.instance().addBreadcrumb({
      level: 'debug',
      message: 'How to use native breadcrumb',
      data: { context: 'WhatEver' },
    });
    this.client.debug('AppService Debug', 'context');

    return this.articleService.findAll(listArticleDto);
  }

  @Get(routesV1.article.queries.getArticleById.route, {
    summary: routesV1.article.queries.getArticleById.summary,
  })
  @ApiOkResponsePayload(ArticleSchema, EApiOkResponsePayload.OBJECT)
  async findArticleById(@Param() params: ObjectIDDto) {
    const data = await this.articleService.findById(params.id);
    throw Error('Exception');
    return data;
  }
}
