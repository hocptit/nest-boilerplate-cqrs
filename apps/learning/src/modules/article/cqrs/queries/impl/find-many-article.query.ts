import { IQuery } from '@nestjs/cqrs';
import { BaseQuery } from '@libs/shared';
import { ListArticleRequest } from '@assets/proto/learning/learning';

export class FindManyArticlesQuery extends BaseQuery implements IQuery {
  constructor(public listArticleDto: ListArticleRequest) {
    super();
  }
}
