import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ArticleCategoryCreateDto {
	@ApiProperty({ description: 'Tên danh mục bài viết' })
	@IsNotEmpty()
	@IsString()
	name: string;
}
