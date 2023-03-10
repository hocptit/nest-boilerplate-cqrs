import { Injectable } from '@nestjs/common';
import { IMapper } from '@shared/cqrs/mappers/IMapper';
import { ArticleEntity } from '../domain/models/entities/ArticleEntity';
import {
  ArticleDocument,
  ArticleSchema,
} from '../domain/models/schemas/Article.schema';
import { ArticleResponseDto } from '../dtos/ArticleResponse.dto';
import { BaseMapper } from '../../../shared/cqrs/mappers/mapper.base';
import { EventPublisher } from '@nestjs/cqrs';

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

  toPersistencies(entities: ArticleEntity[]): ArticleDocument[] {
    throw new Error('Method not implemented.');
  }
  toDomains(records: ArticleDocument[]): ArticleEntity[] {
    return records.map((record) => this.toDomain(record));
  }
  toResponses(entities: ArticleEntity[]): ArticleResponseDto[] {
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
