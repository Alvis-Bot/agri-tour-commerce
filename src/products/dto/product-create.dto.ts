import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductPriceCreateDto } from '@/product-prices/dto/product-price-create.dto';
import { Transform } from 'class-transformer';

export class ProductCreateDto extends ProductPriceCreateDto {
	@ApiProperty({ description: 'Tên sản phẩm', example: 'Áo thun nam' })
	name: string;

	@ApiProperty({ description: 'Khối lượng sản phẩm', example: 100 })
	weight: number;

	@ApiProperty({ description: 'Đơn vị tính', example: 'Chiếc' })
	unit: string;

	// số lượng tồn
	@ApiProperty({
		description: 'Số lượng',
		example: 100,
	})
	inventory: number;

	@ApiPropertyOptional({
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
