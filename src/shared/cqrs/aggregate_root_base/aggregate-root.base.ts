import { AggregateRoot } from '@nestjs/cqrs';
import { BaseDocument } from '@shared/models/base.entity';
import { ObjectId } from 'mongoose';
import { BaseSchema } from '../../models/base.entity';


export type AggregateID = ObjectId;
export class BaseAggregateRoot<Schema extends BaseSchema , TDocument = Schema & BaseDocument> extends AggregateRoot {
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
