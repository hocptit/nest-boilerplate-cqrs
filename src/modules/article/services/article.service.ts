import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindManyArticlesQuery } from '../cqrs/queries/impl/find-many-article.query';
import { CreateArticleDto } from '../dtos/CreateArticle.dto';
import { CreateArticleCommand } from '../cqrs/commands/impl/create-article.command';
import { ArticleDocument } from '@modules/article/domain/models/schemas/Article.schema';
import { Result, match } from 'oxide.ts';
import { ENotFoundArticle } from '../domain/article.error';
import { BadRequestException } from '@shared/exception';
import { FindSingleArticleQuery } from '../cqrs/queries/impl/find-single-article.query';
import { AggregateID } from '../../../shared/cqrs/aggregate_root_base/aggregate-root.base';
import { BaseResponseCommand } from '@shared/types/response-command.base';
import { ListArticleDto } from '../dtos/ListArticle.dto';

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
