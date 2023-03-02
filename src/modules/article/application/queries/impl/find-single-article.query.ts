import { IQuery } from '@nestjs/cqrs';
import { QueryBase } from '@shared/cqrs/queries/query.base';

export class FindSingleArticleQuery extends QueryBase implements IQuery {
  constructor(public readonly id: string) {
    super();
  }
}
