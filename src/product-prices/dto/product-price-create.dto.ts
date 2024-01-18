import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class ProductPriceCreateDto {
	@ApiProperty({
		example: 10000,
		description: 'The retail price of the product',
	})
	retailPrice: number;

	@ApiProperty({
		example: 8000,
		description: 'The distribution price of the product',
	})
	salePrice: number;

	@ApiProperty({
		example: '2021-05-21T14:00:00.000Z',
		description: 'The start date of the sale',
	})
	@Transform(({ value }) => new Date(value))
	saleStartDate: Date;

	@ApiProperty({
		example: '2021-05-21T14:00:00.000Z',
		description: 'The end date of the sale',
	})
	@Transform(({ value }) => new Date(value))
	saleEndDate: Date;
}
