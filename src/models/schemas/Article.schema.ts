import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Prop } from 'infra/swagger';
import { BaseSchema } from '@shared/models/base.entity';

export type ArticleDocument = Article & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
  virtuals: true,
})
export class Article extends BaseSchema {
  @Prop({ default: 'This is content' })
  content: string;

  @Prop({ default: '' })
  author: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
