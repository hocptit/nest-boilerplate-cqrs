import { Injectable } from "@nestjs/common";
import { IMapper } from "@shared/cqrs/IMapper";
import { ArticleEntity } from '../domain/aggregate_root/ArticleEntity';
import { ArticleDocument } from '../domain/models/schemas/Article.schema';
import { ArticleResponseDto } from "../dtos/ArticleResponse.dto";

@Injectable()
export class ArticleMapper
  implements IMapper<ArticleEntity, ArticleDocument, any>
{
  toPersistence(entity: ArticleEntity): ArticleDocument {
    return entity.document;
  }
  toDomain(record: ArticleDocument): ArticleEntity {
    return new ArticleEntity(record._id, record);
  }
  toResponse(entity: ArticleEntity): ArticleResponseDto {
    const response = new ArticleResponseDto();
    response.id = entity.document._id;
    response.content = entity.document.content;
    return response;
  }
}