import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticlesService } from '../services/article.service';
import { ObjectId } from 'mongoose';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ObjectIDDto } from '@shared/dtos/ObjectID.dto';

@Controller('article')
@UsePipes(new ValidationPipe())
@ApiTags('Article')
export class ArticleQueriesController {
  constructor(private readonly articleService: ArticlesService) {}
  @Get()
  async findArticles() {
    return this.articleService.findAll();
  }

  @ApiOperation({ summary: 'Get by id' })
  @Get(':id')
  async findArticleById(@Param() params: ObjectIDDto) {
    return this.articleService.findById(params.id);
  }
}
