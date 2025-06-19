import { ApiProperty } from '@nestjs/swagger';
import { CommandDto } from '@shared/dtos/Command.dto';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

/**
 * Data Transfer Object for creating a new article.
 * Extends CommandDto to inherit common command properties.
 * 
 * @class CreateArticleDto
 * @extends {CommandDto}
 */
export class CreateArticleDto extends CommandDto {
  /**
   * The title of the article.
   * Must be between 1 and 200 characters.
   * 
   * @type {string}
   * @memberof CreateArticleDto
   */
  @ApiProperty({
    description: 'The title of the article',
    example: 'Introduction to NestJS CQRS',
    minLength: 1,
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  title: string;

  /**
   * The content of the article.
   * Must be between 10 and 10000 characters.
   * 
   * @type {string}
   * @memberof CreateArticleDto
   */
  @ApiProperty({
    description: 'The content of the article',
    example: 'This article explains how to implement CQRS pattern in NestJS...',
    minLength: 10,
    maxLength: 10000,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10000)
  content: string;
}
