import { ApiProperty } from '@nestjs/swagger';
import { CommandDto } from '@shared/dtos/Command.dto';
import { IsString } from 'class-validator';

export class CreateArticleDto extends CommandDto{
  @ApiProperty()
  @IsString()
  content: string;
}
