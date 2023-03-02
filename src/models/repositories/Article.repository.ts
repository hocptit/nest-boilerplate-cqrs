import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Article, ArticleDocument } from '../schemas/Article.schema';

@Injectable()
export default class ArticleRepository {
  constructor(
    @InjectModel(Article.name)
    public articleDocumentModel: Model<ArticleDocument>,
  ) {}
  findArticle(id: string): Promise<ArticleDocument> {
    return this.articleDocumentModel.findOne({ _id: id }).exec();
  }
}
