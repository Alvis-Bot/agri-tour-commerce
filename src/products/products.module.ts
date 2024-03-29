import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@/common/entities/product/product.entity';
import { ProductCategoriesModule } from '@/product-categories/product-categories.module';
import { StoresModule } from '@/stores/stores.module';
import { ProductPricesModule } from '@/product-prices/product-prices.module';

@Module({
	imports: [
		StoresModule,
		ProductPricesModule,
		ProductCategoriesModule,
		TypeOrmModule.forFeature([Product]),
	],
	providers: [ProductsService],
	controllers: [ProductsController],
	exports: [ProductsService],
})
export class ProductsModule {}
