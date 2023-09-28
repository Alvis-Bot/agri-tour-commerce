import { Module } from '@nestjs/common';
import { ProductCategoriesService } from './product-categories.service';
import { ProductCategoriesController } from './product-categories.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductCategory } from "@/common/entities/product-category.entity";
import { ShopModule } from "@/shop/shop.module";

@Module({
  imports: [
    ShopModule,
    TypeOrmModule.forFeature([ProductCategory])
  ],
  providers: [ProductCategoriesService],
  controllers: [ProductCategoriesController]
})
export class ProductCategoriesModule {}
