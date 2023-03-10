import {
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticlesService } from '../services/article.service';
import { ApiOperation } from '@nestjs/swagger';
import { ObjectIDDto } from '@shared/dtos/ObjectID.dto';
import { routesV1 } from 'app.routes';
import { Controller, Get, List } from '@shared/decorators/mixin.decorators';

@Controller(routesV1.article.root)
@UsePipes(new ValidationPipe())
export class ArticleQueriesController {
  constructor(private readonly articleService: ArticlesService) {}
  @List()
  async findArticles() {
    return this.articleService.findAll();
  }

  @Get(':id')
  async findArticleById(@Param() params: ObjectIDDto) {
    return this.articleService.findById(params.id);
  }
}
