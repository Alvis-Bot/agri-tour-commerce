import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Transform } from 'class-transformer';

export class ArticleCreateDto {
	@ApiProperty()
	readonly title: string;

	@ApiProperty()
	readonly content: string;

	@ApiProperty()
	readonly description: string;

	@ApiProperty({
		required: false,
		type: 'string',
		format: 'binary',
	})
	image: Express.Multer.File;

	@ApiProperty()
	@IsArray()
	@Transform(({ value }) => value.split(',').map(Number))
	articleCategories: number[];
}
