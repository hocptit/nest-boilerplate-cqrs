import { BaseDocument, BaseSchema } from '@libs/shared/models';
import { BaseAggregateRoot } from '@libs/shared/cqrs';

export interface IMapper<
  Schema extends BaseSchema,
  TEntity extends BaseAggregateRoot<Schema, Document>,
  Document = Schema & BaseDocument,
  Response = any,
> {
  // similar ORM
  toPersistence(entity: TEntity): Document;

  // Entity in DDD
  toDomain(record: Document): TEntity;

  // Response to client (if necessary)
  toResponse(entity: TEntity): Response;

  // similar ORM
  toPersistencies(entities: TEntity[]): Document[];

  // Entity in DDD
  toDomains(records: Document[]): TEntity[];

  // Response to client (if necessary)
  toResponses(entities: TEntity[]): Response[];
}
