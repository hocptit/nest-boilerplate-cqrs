import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindManyArticlesQuery } from '../cqrs/queries/impl/find-many-article.query';
import { CreateArticleDto } from '../dtos/CreateArticle.dto';
import { CreateArticleCommand } from '../cqrs/commands/impl/create-article.command';
import { ArticleDocument } from '@modules/article/domain/models/schemas/Article.schema';
import { Result, match, Ok } from 'oxide.ts';
import { ENotFoundArticle } from '../domain/article.error';
import { BadRequestException } from '@shared/exception';
import { FindSingleArticleQuery } from '../cqrs/queries/impl/find-single-article.query';

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

  async findAll(): Promise<ArticleDocument[]> {
    const result: Result<ArticleDocument[], Error> =
      await this.queryBus.execute(new FindManyArticlesQuery());
    return match(result, {
      Ok: (article: ArticleDocument[]) => article,
      Err: (error: Error) => {
        if (error instanceof ENotFoundArticle)
          throw new BadRequestException({ message: error.message });
        throw error;
      },
    });
  }

  async findById(id: string): Promise<ArticleDocument> {
    const result: Result<ArticleDocument, Error> = await this.queryBus.execute(
      new FindSingleArticleQuery(id),
    );
    return match(result, {
      Ok: (article: ArticleDocument) => article,
      Err: (error: Error) => {
        if (error instanceof ENotFoundArticle)
          throw new BadRequestException({ message: error.message });
        throw error;
      },
    });
  }
}
