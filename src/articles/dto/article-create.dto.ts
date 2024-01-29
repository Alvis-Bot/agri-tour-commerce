import { ApiProperty } from '@nestjs/swagger';

export class ArticleCreateDto {
	@ApiProperty()
	readonly title: string;

	@ApiProperty()
	readonly content: string;

	@ApiProperty({
		required: false,
		type: 'string',
		format: 'binary',
	})
	image: Express.Multer.File;
}
