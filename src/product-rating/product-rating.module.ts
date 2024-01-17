import { Module } from '@nestjs/common';
import { ProductRatingService } from './product-rating.service';
import { ProductRatingController } from './product-rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRatingEntity } from '@/common/entities/product/product-rating.entity';
import { ProductsModule } from '@/products/products.module';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([ProductRatingEntity])],
  providers: [ProductRatingService],
  controllers: [ProductRatingController],
})
export class ProductRatingModule {}
