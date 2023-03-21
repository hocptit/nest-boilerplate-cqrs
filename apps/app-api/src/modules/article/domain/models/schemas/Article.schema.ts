import { Schema, SchemaFactory } from '@nestjs/mongoose';

import { BaseDocument, BaseSchema, Prop } from '@libs/shared';

export type ArticleDocument = ArticleSchema & BaseDocument;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
  virtuals: true,
  collection: 'article_schema',
})
export class ArticleSchema extends BaseSchema {
  @Prop({ default: 'This is content' })
  content: string;

  @Prop({ default: '' })
  author: string;
}

export const ArticleSchemaInstance =
  SchemaFactory.createForClass(ArticleSchema);
