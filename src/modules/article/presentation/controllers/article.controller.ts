import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticlesService } from '../../article.service';
import { v4 as uuid } from 'uuid';
import { ArticleDocument } from '@models/schemas/Article.schema';
import { CreateArticleDto } from '../../dtos/CreateArticle.dto';

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
