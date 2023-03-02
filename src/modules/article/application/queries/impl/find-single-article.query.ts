import { IQuery } from '@nestjs/cqrs';

export class FindSingleArticleQuery implements IQuery {
  constructor(public readonly id: string) {}
}
