import { Injectable } from '@nestjs/common';

import { BaseMapper } from '@libs/shared';
import { EventPublisher } from '@nestjs/cqrs';
import { ArticleEntity } from '@app/learning/modules/article/domain/models/entities/ArticleEntity';
import { ArticleResponseDto } from '@app/learning/modules/article/dtos/ArticleResponse.dto';
import {
  ArticleDocument,
  ArticleSchema,
} from '@app/learning/modules/article/domain/models/schemas/Article.schema';

@Injectable()
export class ArticleMapper extends BaseMapper<
  ArticleSchema,
  ArticleEntity,
  ArticleDocument,
  ArticleResponseDto
> {
  constructor(protected readonly publisher: EventPublisher) {
    super(publisher);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toPersistencies(_entities: ArticleEntity[]): ArticleDocument[] {
    throw new Error('Method not implemented.');
  }
  toDomains(records: ArticleDocument[]): ArticleEntity[] {
    return records.map((record) => this.toDomain(record));
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toResponses(_entities: ArticleEntity[]): ArticleResponseDto[] {
    throw new Error('Method not implemented.');
  }

  toPersistence(entity: ArticleEntity): ArticleDocument {
    return entity.document;
  }

  toDomain(record: ArticleDocument): ArticleEntity {
    const entity = new ArticleEntity(record._id, record);
    return this.publisher.mergeObjectContext(entity);
  }

  toResponse(entity: ArticleEntity): ArticleResponseDto {
    const response = new ArticleResponseDto();
    response.id = entity.document._id;
    response.content = entity.document.content;
    return response;
  }
}
