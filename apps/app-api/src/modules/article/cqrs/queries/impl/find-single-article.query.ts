import { IQuery } from '@nestjs/cqrs';
import { BaseQuery } from '@libs/shared';

export class FindSingleArticleQuery extends BaseQuery implements IQuery {
  constructor(public readonly id: string) {
    super();
  }
}
