import { Injectable } from '@nestjs/common';
import { ProductPrice } from '@/common/entities/product/product-price.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductPriceCreateDto } from '@/product-prices/dto/product-price-create.dto';

@Injectable()
export class ProductPricesService {
	constructor(
		@InjectRepository(ProductPrice)
		private readonly productPriceRepository: Repository<ProductPrice>,
	) {}

	async createBasePrice(data: ProductPriceCreateDto): Promise<ProductPrice> {
		const productPriceCreated = this.productPriceRepository.create({ ...data });
		return await this.productPriceRepository.save(productPriceCreated);
	}
}
