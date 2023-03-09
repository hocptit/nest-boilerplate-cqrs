import { IQuery } from '@nestjs/cqrs';
import { BaseQuery } from '@shared/cqrs/queries/query.base';

export class FindSingleArticleQuery extends BaseQuery implements IQuery {
  constructor(public readonly id: string) {
    super();
  }
}
