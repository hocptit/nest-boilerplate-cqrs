import { AggregateRoot } from '@nestjs/cqrs';
import { BaseDocument, BaseSchema } from '@libs/shared';
import { ObjectId } from 'mongoose';

export type AggregateID = ObjectId;
export class BaseAggregateRoot<
  Schema extends BaseSchema,
  TDocument = Schema & BaseDocument,
> extends AggregateRoot {
  // todo: don't using public document, should use private field, apply get,set method for each field
  public document: TDocument;
  public id: AggregateID;
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
