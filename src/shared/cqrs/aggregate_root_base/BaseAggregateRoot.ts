import { AggregateRoot } from '@nestjs/cqrs';
import { ObjectId } from 'mongoose';

export class BaseAggregateRoot<TDocument> extends AggregateRoot {
  document: TDocument;

  constructor(
    private readonly id: ObjectId | undefined,
    document?: TDocument | undefined,
  ) {
    super();
    this.document = document;
  }

  setData(document: TDocument) {
    this.document = document;
    return this;
  }
}
