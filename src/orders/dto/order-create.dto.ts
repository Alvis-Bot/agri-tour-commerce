import {
	ArrayMinSize,
	IsArray,
	IsInt,
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
	@ApiProperty({ type: [OrderDetailCreateDto] })
	@IsArray()
	@ArrayMinSize(1)
	@ValidateNested({ each: true })
	orderDetails: OrderDetailCreateDto[];
}
