import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Article, ArticleDocument } from '../schemas/Article.schema';
import { BaseRepository } from '@shared/cqrs/repository.base';
import { ArticleMapper } from '../../../mappers/article.mapper';

@Injectable()
export default class ArticleRepository extends BaseRepository {
  constructor(
    @InjectModel(Article.name)
    public articleDocumentModel: Model<ArticleDocument>,
    public mapper: ArticleMapper
  ) {
    super();
  }
  findArticle(id: string): Promise<ArticleDocument> {
    return this.articleDocumentModel.findOne({ _id: id }).exec();
  }
}
