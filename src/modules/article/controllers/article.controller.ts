import {
  Controller,
  Post,
  Body,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticlesService } from '../services/article.service';
import { ArticleDocument } from '@models/schemas/Article.schema';
import { CreateArticleDto } from '../dtos/CreateArticle.dto';

@Controller('article')
@UsePipes(new ValidationPipe())
export class ArticleController {
  constructor(private readonly ordersService: ArticlesService) {}

  @Post()
  async createArticle(
    @Body() articleDto: CreateArticleDto,
  ): Promise<ArticleDocument> {
    return this.ordersService.createArticle(articleDto);
  }

  @Get()
  async findArticles() {
    return this.ordersService.findAll();
  }
}
