import {
	ArrayMinSize,
	IsArray,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsPositive,
	Min,
	ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderDetailCreateDto {
	@ApiProperty()
	@IsInt()
	@Min(1)
	@IsPositive()
	productId: number;

	@ApiProperty()
	@IsInt()
	@Min(1)
	@IsPositive()
	quantity: number;

	@ApiPropertyOptional({
		description: 'Ghi chú',
	})
	@IsOptional()
	note?: string;
}

export class OrderCreateDto {
	@ApiProperty({
		description: 'Mã tỉnh thành',
		example: '01',
	})
	@IsNotEmpty()
	readonly provinceCode: string;

	@ApiProperty({
		description: 'Mã quận huyện',
		example: '001',
	})
	@IsNotEmpty()
	readonly districtCode: string;

	@ApiProperty({
		description: 'Mã phường xã',
		example: '00001',
	})
	@IsNotEmpty()
	readonly wardCode: string;

	@ApiProperty({
		description: 'Địa chỉ',
		example: 'Số 1, đường 1, phường 1, quận 1, thành phố 1',
	})
	@IsNotEmpty()
	readonly address: string;

	@ApiProperty({ type: [OrderDetailCreateDto] })
	@IsArray()
	@ArrayMinSize(1)
	@ValidateNested({ each: true })
	orderDetails: OrderDetailCreateDto[];
}
