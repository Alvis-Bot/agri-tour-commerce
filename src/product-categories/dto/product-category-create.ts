import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProductCategoryCreate {
	@ApiProperty({ description: 'Tên danh mục sản phẩm' })
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty({
		description: 'Ảnh đại diện',
		type: 'string',
		format: 'binary',
	})
	image: Express.Multer.File;
}
