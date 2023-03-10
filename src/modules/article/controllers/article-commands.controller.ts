import {
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticlesService } from '../services/article.service';
import { ArticleDocument } from '@modules/article/domain/models/schemas/Article.schema';
import { CreateArticleDto } from '../dtos/CreateArticle.dto';
import { routesV1 } from '../../../app.routes';
import { Controller, Post } from '@shared/decorators/mixin.decorators';

@Controller(routesV1.article.root)
@UsePipes(new ValidationPipe())
export class ArticleCommandsController {
  constructor(private readonly ordersService: ArticlesService) {}

  @Post()
  async createArticle(
    @Body() articleDto: CreateArticleDto,
  ): Promise<ArticleDocument> {
    return this.ordersService.createArticle(articleDto);
  }
}
