import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@/common/entities/product.entity';
import { ProductCategoriesModule } from '@/product-categories/product-categories.module';
import { ShopModule } from '@/shop/shop.module';

@Module({
  imports: [
    ShopModule,
    ProductCategoriesModule,
    TypeOrmModule.forFeature([Product]),
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
