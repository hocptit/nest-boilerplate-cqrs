import { ApiProperty } from '@nestjs/swagger';
import { CommandDto } from '@libs/shared';
import { IsString } from 'class-validator';
import { CreateArticleRequest } from '@assets/proto/learning/learning';

export class CreateArticleDto
  extends CommandDto
  implements CreateArticleRequest
{
  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  title: string;
}
