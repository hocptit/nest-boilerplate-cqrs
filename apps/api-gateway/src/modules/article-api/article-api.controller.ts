import {
  ApiOkResponsePayload,
  BaseResponseCommand,
  Controller,
  EApiOkResponsePayload,
  Get,
  ObjectIDDto,
  Post,
} from '@libs/shared';
import { routesV1 } from '@app/api-gateway.routes';
import { Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { ArticleApiService } from '@app/modules/article-api/article-api.service';
import { CreateArticleDto } from '@app/modules/article-api/dtos/CreateArticle.dto';

@Controller(routesV1.article.root)
@UsePipes(new ValidationPipe())
export class ArticleApiController {
  constructor(private readonly articleApiService: ArticleApiService) {}

  @Get(routesV1.article.queries.getArticleById.route, {
    summary: routesV1.article.queries.getArticleById.summary,
  })
  getAll(@Param() params: ObjectIDDto) {
    return this.articleApiService.getArticle({
      id: params.id,
    });
  }
  @Post(routesV1.article.commands.createArticle.route, {
    summary: routesV1.article.commands.createArticle.summary,
  })
  @ApiOkResponsePayload(BaseResponseCommand, EApiOkResponsePayload.OBJECT)
  async createArticle(@Body() articleDto: CreateArticleDto) {
    return this.articleApiService.createArticle({
      title: articleDto.title,
      content: articleDto.content,
    });
  }
  // @List(routesV1.article.queries.getAll.route, {
  //   summary: routesV1.article.queries.getAll.summary,
  // })
  // @ApiOkResponsePayload(ArticleSchema, EApiOkResponsePayload.ARRAY)
  // async findArticles(@Query() listArticleDto: ListArticleDto) {
  //   return this.articleService.findAll(listArticleDto);
  // }
}
