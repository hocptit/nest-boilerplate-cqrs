import { Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { Controller, Post, BaseResponseCommand } from '@libs/shared';
import { CreateArticleDto } from '@app/modules/article/dtos/CreateArticle.dto';
import { ArticlesService } from '@app/modules/article/services/article.service';
import {
  ApiOkResponsePayload,
  EApiOkResponsePayload,
} from '@libs/infra/swagger';
import { routesV1 } from '@app/app.routes';

@Controller(routesV1.article.root)
@UsePipes(new ValidationPipe())
export class ArticleCommandsController {
  constructor(private readonly ordersService: ArticlesService) {}

  @Post(routesV1.article.commands.createArticle.route, {
    summary: routesV1.article.commands.createArticle.summary,
  })
  @ApiOkResponsePayload(BaseResponseCommand, EApiOkResponsePayload.OBJECT)
  async createArticle(@Body() articleDto: CreateArticleDto) {
    return this.ordersService.createArticle(articleDto);
  }
}
