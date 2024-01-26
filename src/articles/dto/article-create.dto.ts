import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ArticleCreateDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	readonly title: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	readonly content: string;
}
