import { Document } from 'mongoose';

export type BaseDocument = BaseSchema & Document;

export class BaseSchema {}
