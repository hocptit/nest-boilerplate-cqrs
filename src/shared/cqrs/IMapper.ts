import { BaseDocument } from '@shared/models/base.entity';
import { BaseAggregateRoot } from './aggregate_root_base/aggregate-root.base';

export interface IMapper<
  DomainAggregate extends BaseAggregateRoot<any>,
  Document = any & BaseDocument,
  Response = any,
> {
  // similar ORM
  toPersistence(entity: DomainAggregate): Document;

  // Entity in DDD
  toDomain(record: Document): DomainAggregate;

  // Response to client (if necessary)
  toResponse(entity: DomainAggregate): Response;

  // similar ORM
  toPersistencies(entities: DomainAggregate[]): Document[];

  // Entity in DDD
  toDomains(records: Document[]): DomainAggregate[];

  // Response to client (if necessary)
  toResponses(entities: DomainAggregate[]): Response[];
}
