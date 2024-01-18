import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProductQueryDto {
	@ApiPropertyOptional()
	@IsOptional()
	productCategoryId?: number;

	@ApiPropertyOptional()
	@IsOptional()
	storeId?: number;
}
