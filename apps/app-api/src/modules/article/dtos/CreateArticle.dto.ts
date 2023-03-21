import { ApiProperty } from '@nestjs/swagger';
import { CommandDto } from '@libs/shared';
import { IsString } from 'class-validator';

export class CreateArticleDto extends CommandDto {
  @ApiProperty()
  @IsString()
  content: string;
}
