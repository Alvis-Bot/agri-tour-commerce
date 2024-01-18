import { Injectable } from '@nestjs/common';
import { User } from '@/common/entities/user.entity';
import { ProductRatingCreateDto } from '@/product-rating/dto/product-rating-create.dto';
import { ProductRatingEntity } from '@/common/entities/product/product-rating.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from '@/products/products.service';
import { ApiException } from '@/exception/api.exception';
import { ErrorMessages } from '@/exception/error.code';

@Injectable()
export class ProductRatingService {
	constructor(
		private readonly productsService: ProductsService,
		@InjectRepository(ProductRatingEntity)
		private readonly productRatingRepository: Repository<ProductRatingEntity>,
	) {}

	async createProductRating(user: User, dto: ProductRatingCreateDto) {
		/*
		 * B1: Kiểm tra xem sản phẩm có tồn tại không
		 * B2: Kiểm tra xem người dùng đã đánh giá sản phẩm này chưa
		 * B3: Nếu chưa đánh giá thì tạo mới đánh giá
		 * B4: Nếu đã đánh giá thì trả về lỗi
		 * B5: Trả về đánh giá
		 * */

		const product = await this.productsService.selectOneProductById(
			dto.productId,
		);
		if (!product) throw new ApiException(ErrorMessages.PRODUCT_NOT_FOUND);

		const ratingExist = await this.existRating(user.id, product.id);
		if (ratingExist) throw new ApiException(ErrorMessages.PRODUCT_RATING_EXIST);

		const ratingCreated = this.productRatingRepository.create({
			...dto,
			product,
			user,
		});
		return await this.productRatingRepository.save(ratingCreated);
	}

	async existRating(userId: number, productId: number) {
		return await this.productRatingRepository
			.createQueryBuilder('product_rating')
			.where('product_rating.user_id = :userId', { userId })
			.andWhere('product_rating.product_id = :productId', { productId })
			.getOne();
	}
}
