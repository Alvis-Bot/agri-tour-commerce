import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductRatingCreateDto {
	@IsNotEmpty()
	@ApiProperty()
	productId: number;

	@IsNotEmpty()
	@ApiProperty()
	rating: number;

	@IsOptional()
	@ApiPropertyOptional()
	comment: string;
}
