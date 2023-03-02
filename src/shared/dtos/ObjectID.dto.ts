import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class ObjectIDDto {
  @Length(24, 24)
  @IsString()
  @ApiProperty({ required: true })
  id: string;
}
