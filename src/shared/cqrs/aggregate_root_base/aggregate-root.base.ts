import { AggregateRoot } from '@nestjs/cqrs';
import { ObjectId } from 'mongoose';

export class BaseAggregateRoot<TDocument = any & Document> extends AggregateRoot {
  protected document: TDocument;
  protected id: ObjectId;
  constructor(id?: ObjectId | undefined, document?: TDocument | undefined) {
    super();
    this.document = document;
    this.id = id;
  }

  setId(id: ObjectId) {
    this.id = id;
    return this;
  }

  setData(document: TDocument) {
    this.document = document;
    return this;
  }
}
