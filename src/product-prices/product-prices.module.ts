import { Module } from '@nestjs/common';
import { ProductPricesService } from './product-prices.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPrice } from '@/common/entities/product/product-price.entity';

@Module({
	imports: [TypeOrmModule.forFeature([ProductPrice])],
	providers: [ProductPricesService],
	exports: [ProductPricesService],
})
export class ProductPricesModule {}
