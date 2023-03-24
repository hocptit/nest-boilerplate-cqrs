import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '@libs/shared';
import { ArticleMapper } from '@app/modules/article/mappers/article.mapper';
import {
  ArticleDocument,
  ArticleSchema,
} from '@app/modules/article/domain/models/schemas/Article.schema';

@Injectable()
export default class ArticleRepository extends BaseRepository {
  constructor(
    @InjectModel(ArticleSchema.name)
    public articleDocumentModel: Model<ArticleDocument>,
    public mapper: ArticleMapper,
  ) {
    super();
  }
  findArticle(id: string): Promise<ArticleDocument> {
    return this.articleDocumentModel.findOne({ _id: id }).exec();
  }
}
