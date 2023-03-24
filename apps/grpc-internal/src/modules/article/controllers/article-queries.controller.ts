import { Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ApiOkResponsePayload,
  EApiOkResponsePayload,
  ObjectIDDto,
  Controller,
  Get,
  List,
} from '@libs/shared';
import { routesV1 } from '@app/app.routes';
import { ArticleSchema } from '@app/modules/article/domain/models/schemas/Article.schema';
import { ListArticleDto } from '@app/modules/article/dtos/ListArticle.dto';
import { ArticlesService } from '@app/modules/article/services/article.service';

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
