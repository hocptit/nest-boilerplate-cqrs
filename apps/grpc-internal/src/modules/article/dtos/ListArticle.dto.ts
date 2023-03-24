import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQuery, SafeMongoIdTransform } from '@libs/shared';
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
  content: string;
}
