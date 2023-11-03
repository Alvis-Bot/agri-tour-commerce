import { Injectable } from '@nestjs/common';
import { User } from "@/common/entities/user.entity";
import { ProductRatingCreateDto } from "@/product-rating/dto/product-rating-create.dto";
import { ProductRatingEntity } from "@/common/entities/product-rating.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductsService } from "@/products/products.service";
import { Product } from "@/common/entities/product.entity";
import { FindOptionsWhere } from 'typeorm';
import { ApiException } from "@/exception/api.exception";
import { ErrorMessages } from "@/exception/error.code";
@Injectable()
export class ProductRatingService {

  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(ProductRatingEntity)
    private readonly productRatingRepository: Repository<ProductRatingEntity>,
  ) {
  }
  async createProductRating(user: User, dto: ProductRatingCreateDto) {
    const  product = await this.productsService.getProductById(dto.productId);
    const exist = await this.existRating(user, product);
    if (exist) {
      throw new ApiException(ErrorMessages.PRODUCT_RATING_EXIST)
    }
    const rating = this.productRatingRepository.create({
      ...dto,
      product,
      user,
    });
    return await this.productRatingRepository.save(rating);
  }

  async existRating(user: User, product: Product) {
    return  await this.productRatingRepository.exist({
      where: {
        user: {
          id: user.id
        },
        product: {
          id: product.id
        }
      }
    });
  }
}