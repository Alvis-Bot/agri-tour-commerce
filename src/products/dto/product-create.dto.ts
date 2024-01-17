import {
	IsBoolean,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductPriceCreateDto } from '@/product-prices/dto/product-price-create.dto';

export class ProductCreateDto extends ProductPriceCreateDto {
	@ApiProperty({ description: 'Tên sản phẩm', example: 'Áo thun nam' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(80)
	name: string;

	@ApiProperty({ description: 'Mã sản phẩm/SKU', example: 'ATN123' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(80)
	sku: string;

	@ApiProperty({ description: 'Khối lượng', example: '500g' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(80)
	weight: string;

	@ApiProperty({ description: 'Mã vạch/Barcode', example: '8938505974192' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(80)
	barcode: string;

	@ApiProperty({ description: 'Đơn vị tính', example: 'Chiếc' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(80)
	unit: string;

	@ApiProperty({
		description: 'Mô tả sản phẩm',
		example: 'Áo thun nam màu xanh, chất liệu cotton',
	})
	@IsOptional()
	@IsString()
	description?: string;

	@ApiProperty({
		description: 'Chú thích',
		example: 'Sản phẩm bán chạy nhất mùa hè',
	})
	@IsOptional()
	@IsString()
	note?: string;

	@ApiProperty({ description: 'Cho phép bán', example: true })
	@IsNotEmpty()
	@IsBoolean()
	isAllowSale: boolean;

	@ApiProperty({ description: 'Áp dụng thuế', example: false })
	@IsNotEmpty()
	@IsBoolean()
	isApplyTax: boolean;

	@ApiProperty({ description: 'ID danh mục sản phẩm', example: 1 })
	@IsNotEmpty()
	@IsNumber()
	productCategoryId: number;

	@ApiProperty({
		description: 'Ảnh sản phẩm',
		required: false,
		type: 'string',
		format: 'binary',
		isArray: true,
	})
	@IsOptional()
	@IsString()
	images?: string;
}
