import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQuery } from '@shared/cqrs/queries/query.base';
import { SafeMongoIdTransform } from '@shared/dtos/ObjectID.dto';
import { Transform } from 'class-transformer';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
export class ListArticleDto extends BaseQuery {
  @IsMongoId()
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  @Transform((value) => SafeMongoIdTransform(value))
  author: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title: string;
}