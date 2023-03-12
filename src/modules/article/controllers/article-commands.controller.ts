import { Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ArticlesService } from '../services/article.service';
import { CreateArticleDto } from '../dtos/CreateArticle.dto';
import { routesV1 } from '../../../app.routes';
import { Controller, Post } from '@shared/decorators/mixin.decorators';
import { ApiOkResponsePayload, EApiOkResponsePayload } from 'infra/swagger';
import { BaseResponseCommand } from '@shared/types/response-command.base';
import * as Sentry from '@sentry/node';

@Controller(routesV1.article.root)
@UsePipes(new ValidationPipe())
export class ArticleCommandsController {
  constructor(private readonly ordersService: ArticlesService) {}

  @Post(routesV1.article.commands.createArticle.route, {
    summary: routesV1.article.commands.createArticle.summary,
  })
  @ApiOkResponsePayload(BaseResponseCommand, EApiOkResponsePayload.OBJECT)
  async createArticle(@Body() articleDto: CreateArticleDto) {
    const transaction = Sentry.startTransaction({
      op: 'transaction',
      name: 'My Transaction',
    });
    const data = await this.ordersService.createArticle(articleDto);

    transaction.finish();
    return data;
  }
}
