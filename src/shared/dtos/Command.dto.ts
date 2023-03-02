import { ApiProperty } from '@nestjs/swagger';
import { CommandMetadata } from '@shared/cqrs/commands/command.base';
import { IsOptional } from 'class-validator';
export class CommandDto {
  @ApiProperty()
  @IsOptional()
  metadata: CommandMetadata;
}
