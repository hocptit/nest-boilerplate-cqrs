import { BaseDocument } from '@shared/models/base.entity';
import { BaseAggregateRoot } from './aggregate_root_base/aggregate-root.base';

export interface IMapper<
  DomainAggregate extends BaseAggregateRoot<any>,
  Document = any & BaseDocument,
  Response = any,
> {
  toPersistence(entity: DomainAggregate): Document;  
  toDomain(record: Document): DomainAggregate;
  toResponse(entity: DomainAggregate): Response;
}
