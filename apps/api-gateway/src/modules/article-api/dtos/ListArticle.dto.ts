import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQuery, SafeMongoIdTransform } from '@libs/shared';
import { Transform } from 'class-transformer';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { ListArticleRequest } from '@assets/proto/learning/learning';
export class ListArticleDto extends BaseQuery implements ListArticleRequest {
  @IsMongoId()
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  @Transform((value) => SafeMongoIdTransform(value))
  author: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  content: string;
}
