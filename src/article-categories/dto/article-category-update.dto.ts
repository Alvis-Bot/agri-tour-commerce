import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ArticleCategoryUpdateDto {
	@ApiProperty()
	@IsNotEmpty()
	articleCategoryId: number;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;
}
