import { AggregateRoot } from '@nestjs/cqrs';
import { ObjectId } from 'mongoose';


export type AggregateID = ObjectId;
export class BaseAggregateRoot<TDocument = any & Document> extends AggregateRoot {
  public document: TDocument;
  protected id: AggregateID;
  constructor(id?: AggregateID | undefined, document?: TDocument | undefined) {
    super();
    this.document = document;
    this.id = id;
  }

  setId(id: AggregateID) {
    this.id = id;
    return this;
  }

  setData(document: TDocument) {
    this.document = document;
    return this;
  }

}
