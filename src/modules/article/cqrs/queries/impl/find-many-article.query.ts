import { IQuery } from '@nestjs/cqrs';
import { QueryBase } from '@shared/cqrs/queries/query.base';

export class FindManyArticlesQuery extends QueryBase implements IQuery {}
