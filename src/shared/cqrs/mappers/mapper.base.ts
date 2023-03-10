import { BaseDocument } from '@shared/models/base.entity';
import { BaseAggregateRoot } from '../aggregate_root_base/aggregate-root.base';
import { IMapper } from './IMapper';
import { BaseSchema } from '../../models/base.entity';
import { EventPublisher } from '@nestjs/cqrs';

export class BaseMapper<
  Schema extends BaseSchema,
  TEntity extends BaseAggregateRoot<Schema, TDocument>,
  TDocument = Schema & BaseDocument,
  Response = any,
> implements IMapper<Schema, TEntity, TDocument, Response>
{
  constructor(protected readonly publisher: EventPublisher){}

  toPersistence(entity: TEntity): TDocument {
    return entity.document;
  }
  toDomain(record: TDocument): TEntity {
    throw new Error('Method not implemented.');
    // return new DomainAggregate(record._id, record);
  }
  toResponse(entity: TEntity): Response {
    throw new Error('Method not implemented.');
  }
  toPersistencies(entities: TEntity[]): TDocument[] {
    return entities.map((entity) => entity.document);
  }
  toDomains(records: TDocument[]): TEntity[] {
    throw new Error('Method not implemented.');
  }
  toResponses(entities: TEntity[]): Response[] {
    throw new Error('Method not implemented.');
  }
}
