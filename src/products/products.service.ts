import { Injectable } from '@nestjs/common';
import { Product } from '@/common/entities/product/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCreateDto } from '@/products/dto/product-create.dto';
import { ProductCategoriesService } from '@/product-categories/product-categories.service';
import { ApiException } from '@/exception/api.exception';
import { ErrorMessages } from '@/exception/error.code';
import { ProductQueryDto } from '@/products/dto/product-query.dto';
import { Pagination } from '@/common/pagination/pagination.dto';
import { Meta } from '@/common/pagination/meta.dto';
import { PaginationModel } from '@/common/pagination/pagination.model';
import { StoresService } from '@/stores/stores.service';
import { ProductPricesService } from '@/product-prices/product-prices.service';

@Injectable()
export class ProductsService {
	constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>,
		private readonly productCategoriesService: ProductCategoriesService,
		private readonly productPricesService: ProductPricesService,
		private readonly shopService: StoresService,
	) {}

	async createProduct(
		dto: ProductCreateDto,
		files: Express.Multer.File[],
		storeId: number,
	) {
		const store = await this.shopService.selectOneStoreById(storeId);
		if (!store) throw new ApiException(ErrorMessages.STORE_NOT_FOUND);
		const productCategory =
			await this.productCategoriesService.getProductCategoryById(
				dto.productCategoryId,
			);
		const productPrice = await this.productPricesService.createBasePrice({
			...dto,
		});
		const productCreated = this.productRepository.create({
			...dto,
			productPrice,
			images: files.map((file) => file.filename),
			productCategory: productCategory,
			store,
		});
		const product = await this.productRepository.save(productCreated);
		return this.selectOneProductById(product.id);
	}

	async selectOneProductById(id: number) {
		return await this.productRepository
			.createQueryBuilder('product')
			.leftJoinAndSelect('product.productPrice', 'productPrice')
			.leftJoinAndSelect('product.productCategory', 'productCategory')
			.leftJoinAndSelect('product.store', 'store')
			.leftJoinAndSelect('product.ratings', 'rating')
			.where('product.id = :id', { id })
			.getOne();
	}

	async selectOneProductFetchStoreById(id: number) {
		return await this.productRepository.findOne({
			where: { id },
			relations: ['store'],
		});
	}

	async getProductById(id: number) {
		const product = await this.selectOneProductById(id);
		if (!product) throw new ApiException(ErrorMessages.PRODUCT_NOT_FOUND);
		return product;
	}

	async getProductsPagination(dto: ProductQueryDto, pagination: Pagination) {
		// add field sum rating
		const queryBuilder = this.productRepository
			.createQueryBuilder('product')
			.leftJoinAndSelect('product.productPrice', 'productPrice')
			.leftJoinAndSelect('product.productCategory', 'productCategory')
			// .leftJoinAndSelect('product.store', 'store')
			.where('product.isActive = :isActive', { isActive: true })
			// nếu có  productCategoryId thì mới join
			.andWhere(
				dto.productCategoryId
					? 'product.product_category_id = :productCategoryId'
					: '1=1',
				{
					productCategoryId: dto.productCategoryId,
				},
			)
			// nếu có storeId thì mới join
			.andWhere(dto.storeId ? 'product.store_id = :storeId' : '1=1', {
				storeId: dto.storeId,
			})
			.skip(pagination.skip)
			.take(pagination.take);

		const itemCount = await queryBuilder.getCount();
		const { entities } = await queryBuilder.getRawAndEntities();
		const meta = new Meta({ itemCount, pagination });
		return new PaginationModel(entities, meta);
	}

	async selectOneProductByStoreId(id: number): Promise<Product | undefined> {
		return await this.productRepository
			.createQueryBuilder('product')
			.leftJoinAndSelect('product.productPrice', 'productPrice')
			.leftJoinAndSelect('product.productCategory', 'productCategory')
			.leftJoinAndSelect('product.store', 'store')
			.where('product.storeId = :storeId', { storeId: id })
			.getOne();
	}
}
