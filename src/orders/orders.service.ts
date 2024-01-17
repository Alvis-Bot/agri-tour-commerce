import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from '@/common/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from '@/common/entities/order-detail.entity';
import { ProductsService } from '@/products/products.service';
import { OrderCreateDto } from '@/orders/dto/order-create.dto';
import { Pagination } from '@/common/pagination/pagination.dto';
import { Meta } from '@/common/pagination/meta.dto';
import { PaginationModel } from '@/common/pagination/pagination.model';
import { User } from '@/common/entities/user.entity';
import { StoreService } from '@/shop/store.service';
import { ApiException } from '@/exception/api.exception';
import { ErrorMessages } from '@/exception/error.code';

@Injectable()
export class OrdersService {
	constructor(
		private readonly productsService: ProductsService,
		@InjectRepository(Order)
		private readonly orderRepository: Repository<Order>,
		@InjectRepository(OrderDetail)
		private readonly orderDetailRepository: Repository<OrderDetail>,
		private readonly storeService: StoreService,
	) {}

	async createOrder(dto: OrderCreateDto, myUser: User) {
		const store = await this.storeService.selectOneStoreById(dto.storeId);
		const orderDetails = await Promise.all(
			dto.orderDetails.map(async (value) => {
				const product =
					await this.productsService.selectOneProductFetchStoreById(
						value.productId,
					);
				if (!product) throw new ApiException(ErrorMessages.PRODUCT_NOT_FOUND);
				// nếu product không thuộc store này thì không cho đặt hàng
				if (product.store.id !== store.id)
					throw new ApiException(ErrorMessages.PRODUCT_NOT_IN_STORE);
				return this.orderDetailRepository.create({
					...value,
					product,
				});
			}),
		);

		const orderDetailSave = await this.orderDetailRepository.save(orderDetails);

		const order = this.orderRepository.create({
			...dto,
			orderDetails: orderDetailSave,
			user: myUser,
			store,
		});

		const saveOrder = await this.orderRepository.save(order);
		return this.selectOneOrderById(saveOrder.id);
	}

	async selectOneOrderById(id: number) {
		return await this.orderRepository.findOne({
			where: { id },
			relations: ['orderDetails', 'orderDetails.product'],
		});
	}

	async getOrdersPagination(pagination: Pagination) {
		const queryBuilder = this.orderRepository
			.createQueryBuilder('order')
			.leftJoinAndSelect('order.orderDetails', 'orderDetail')
			.leftJoinAndSelect('orderDetail.product', 'product')
			.take(pagination.take)
			.skip(pagination.skip)
			// xắp xếp theo tên quận huyện
			.orderBy('orderDetail.id', 'DESC');
		// lấy ra các trường cần thiết
		// .select(['district.code', 'district.name', 'district.nameEn'])

		const itemCount = await queryBuilder.getCount();
		const { entities } = await queryBuilder.getRawAndEntities();
		const meta = new Meta({ itemCount, pagination });
		return new PaginationModel(entities, meta);
	}
}
