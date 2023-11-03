import { Injectable } from '@nestjs/common';
import { User } from "@/common/entities/user.entity";
import { ProductRatingCreateDto } from "@/product-rating/dto/product-rating-create.dto";
import { ProductRatingEntity } from "@/common/entities/product-rating.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductsService } from "@/products/products.service";

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
    const rating = this.productRatingRepository.create({
      ...dto,
      product,
      user,
    });
    return await this.productRatingRepository.save(rating);
  }
}
