import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ArticleDocument } from '@app/learning/modules/article/domain/models/schemas/Article.schema';
import { Result, match } from 'oxide.ts';
import { AggregateID, BadRequestException } from '@libs/shared';
import { ENotFoundArticle } from '@app/learning/modules/article/domain/article.error';
import { FindSingleArticleQuery } from '@app/learning/modules/article/cqrs/queries/impl/find-single-article.query';
import { CreateArticleCommand } from '@app/learning/modules/article/cqrs/commands/impl/create-article.command';
import { FindManyArticlesQuery } from '@app/learning/modules/article/cqrs/queries/impl/find-many-article.query';
import {
  CreateArticleRequest,
  CreateArticleResponse,
  GetArticleResponse,
  ListArticleRequest,
  ListArticleResponse,
} from '@assets/proto/learning/learning';
import { NotFoundRpcException } from '@libs/shared/exception/exception.grpc';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createArticle(
    dto: CreateArticleRequest,
  ): Promise<CreateArticleResponse> {
    const result: Result<AggregateID, Error> = await this.commandBus.execute(
      new CreateArticleCommand(dto),
    );
    return match(result, {
      Ok: (id: AggregateID): CreateArticleResponse => {
        return { id: id as any as string };
      },
      Err: (error: Error) => {
        if (error instanceof ENotFoundArticle)
          throw new BadRequestException({ message: error.message });
        throw error;
      },
    });
  }

  async findAll(
    listArticleDto: ListArticleRequest,
  ): Promise<ListArticleResponse> {
    const result: Result<ArticleDocument[], Error> =
      await this.queryBus.execute(new FindManyArticlesQuery(listArticleDto));
    return match(result, {
      Ok: (article: ArticleDocument[]) => {
        return {
          articles: article.map((article) => {
            return {
              id: article.id,
              title: article.title,
              content: article.content,
              authorId: article.author,
            };
          }),
        };
      },
      Err: (error: Error) => {
        if (error instanceof ENotFoundArticle)
          throw new BadRequestException({ message: error.message });
        throw error;
      },
    });
  }

  async findById(id: string): Promise<GetArticleResponse> {
    const result: Result<ArticleDocument, Error> = await this.queryBus.execute(
      new FindSingleArticleQuery(id),
    );
    return match(result, {
      Ok: (article: ArticleDocument) => {
        return {
          id: article.id,
          title: article.title,
          content: article.content,
        };
      },
      Err: (error: Error) => {
        if (error instanceof ENotFoundArticle)
          throw new NotFoundRpcException({
            message: error.message,
            errorCode: error.errorCode,
          });
        throw error;
      },
    });
  }
}
