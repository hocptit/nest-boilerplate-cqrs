import { Document, ObjectId } from 'mongoose';

export type BaseDocument = BaseSchema & Document;

export class BaseSchema {
    _id: ObjectId;
}
