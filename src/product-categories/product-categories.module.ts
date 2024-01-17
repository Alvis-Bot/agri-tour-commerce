import { Module } from '@nestjs/common';
import { ProductCategoriesService } from './product-categories.service';
import { ProductCategoriesController } from './product-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from '@/common/entities/product/product-category.entity';
import { StoreModule } from '@/shop/store.module';

@Module({
  imports: [StoreModule, TypeOrmModule.forFeature([ProductCategory])],
  providers: [ProductCategoriesService],
  controllers: [ProductCategoriesController],
  exports: [ProductCategoriesService],
})
export class ProductCategoriesModule {}
