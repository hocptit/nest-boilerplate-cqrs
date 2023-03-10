import { BaseDocument, BaseSchema } from '@shared/models/base.entity';
import { BaseAggregateRoot } from '../aggregate_root_base/aggregate-root.base';
import { Schema } from '@nestjs/mongoose';

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
