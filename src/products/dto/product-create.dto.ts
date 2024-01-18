import { ApiProperty } from '@nestjs/swagger';
import { ProductPriceCreateDto } from '@/product-prices/dto/product-price-create.dto';
import { Transform } from 'class-transformer';

export class ProductCreateDto extends ProductPriceCreateDto {
	@ApiProperty({ description: 'Tên sản phẩm', example: 'Áo thun nam' })
	name: string;

	@ApiProperty({ description: 'Giá bán', example: 100000 })
	weight: number;

	@ApiProperty({ description: 'Đơn vị tính', example: 'Chiếc' })
	unit: string;

	@ApiProperty({
		description: 'Mô tả sản phẩm',
		example: 'Áo thun nam màu xanh, chất liệu cotton',
	})
	description?: string;

	@ApiProperty({ description: 'Cho phép bán', example: true })
	isActive: boolean;

	@ApiProperty({ description: 'ID danh mục sản phẩm', example: 1 })
	@Transform(({ value }) => Number(value))
	productCategoryId: number;

	@ApiProperty({
		description: 'Ảnh sản phẩm',
		required: false,
		type: 'string',
		format: 'binary',
		isArray: true,
	})
	images?: string;
}
