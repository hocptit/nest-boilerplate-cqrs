import {
  Controller,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticlesService } from '../services/article.service';

@Controller('article')
@UsePipes(new ValidationPipe())
export class ArticleQueriesController {
  constructor(private readonly articleService: ArticlesService) {}
  @Get()
  async findArticles() {
    return this.articleService.findAll();
  }
}
