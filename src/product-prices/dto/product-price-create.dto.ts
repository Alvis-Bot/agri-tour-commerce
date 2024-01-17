import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class ProductPriceCreateDto {
	@ApiProperty({
		example: 10000,
		description: 'The retail price of the product',
	})
	@IsNumber()
	@Min(0)
	retailPrice: number;

	@ApiProperty({
		example: 8000,
		description: 'The distribution price of the product',
	})
	@IsNumber()
	@Min(0)
	distributionPrice: number;

	@ApiProperty({
		example: 5000,
		description: 'The promotional price of the product',
	})
	@IsNumber()
	@Min(0)
	promotionPrice: number;
}
