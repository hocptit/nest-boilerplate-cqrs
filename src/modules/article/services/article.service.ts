import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindManyArticlesQuery } from '../application/queries/impl/find-many-article.query';
import { CreateArticleDto } from '../dtos/CreateArticle.dto';
import { CreateArticleCommand } from '../application/commands/impl/create-article.command';
import { ArticleDocument } from '@models/schemas/Article.schema';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createArticle(dto: CreateArticleDto) {
    const data = await this.commandBus.execute<
      CreateArticleCommand,
      ArticleDocument
    >(new CreateArticleCommand(dto));
    return data;
  }

  async findAll() {
    return this.queryBus.execute(new FindManyArticlesQuery());
  }
}
