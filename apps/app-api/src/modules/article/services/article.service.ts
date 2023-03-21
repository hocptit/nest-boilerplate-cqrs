import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ArticleDocument } from '@app/modules/article/domain/models/schemas/Article.schema';
import { Result, match } from 'oxide.ts';
import {
  AggregateID,
  BadRequestException,
  BaseResponseCommand,
} from '@libs/shared';
import { ENotFoundArticle } from '@app/modules/article/domain/article.error';
import { ListArticleDto } from '@app/modules/article/dtos/ListArticle.dto';
import { FindSingleArticleQuery } from '@app/modules/article/cqrs/queries/impl/find-single-article.query';
import { CreateArticleDto } from '@app/modules/article/dtos/CreateArticle.dto';
import { CreateArticleCommand } from '@app/modules/article/cqrs/commands/impl/create-article.command';
import { FindManyArticlesQuery } from '@app/modules/article/cqrs/queries/impl/find-many-article.query';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createArticle(dto: CreateArticleDto): Promise<BaseResponseCommand> {
    const result: Result<AggregateID, Error> = await this.commandBus.execute(
      new CreateArticleCommand(dto),
    );
    return match(result, {
      Ok: (id: AggregateID): BaseResponseCommand => {
        return { id };
      },
      Err: (error: Error) => {
        if (error instanceof ENotFoundArticle)
          throw new BadRequestException({ message: error.message });
        throw error;
      },
    });
  }

  async findAll(listArticleDto: ListArticleDto): Promise<ArticleDocument[]> {
    const result: Result<ArticleDocument[], Error> =
      await this.queryBus.execute(new FindManyArticlesQuery(listArticleDto));
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
