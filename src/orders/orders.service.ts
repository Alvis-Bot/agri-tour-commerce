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
import { StoresService } from '@/stores/stores.service';
import { OrderStatusUpdateDto } from '@/orders/dto/order-status-update.dto';
import { ApiException } from '@/exception/api.exception';
import { ErrorMessages } from '@/exception/error.code';
import { Location } from '@/common/entities/store/location.entity';
import { RegionsService } from '@/regions/regions.service';

@Injectable()
export class OrdersService {
	constructor(
		private readonly productsService: ProductsService,
		@InjectRepository(Order)
		private readonly orderRepository: Repository<Order>,
		@InjectRepository(OrderDetail)
		private readonly orderDetailRepository: Repository<OrderDetail>,
		private readonly storeService: StoresService,
		private readonly regionsService: RegionsService,
		@InjectRepository(Location)
		private readonly locationEntityRepository: Repository<Location>,
	) {}

	async createOrder(dto: OrderCreateDto, myUser: User) {
		// nhóm các sản phẩm theo store
		const products = await Promise.all(
			dto.orderDetails.map(async (orderDetail) => {
				const product = await this.productsService.selectOneProductById(
					orderDetail.productId,
				);
				if (!product) throw new ApiException(ErrorMessages.PRODUCT_NOT_FOUND);
				return product;
			}),
		);

		console.log(products);

		// nhóm order cho từng store
		const storeIds = products.map((product) => product.store.id);
		const uniqueStoreIds = [...new Set(storeIds)];
		const orders = uniqueStoreIds.map((storeId) => ({
			storeId,
			orderDetails: products
				.filter((product) => product.store.id === storeId)
				.map((product) => ({
					product,
					quantity: dto.orderDetails.find(
						(orderDetail) => orderDetail.productId === product.id,
					).quantity,
					note: dto.orderDetails.find(
						(orderDetail) => orderDetail.productId === product.id,
					).note,
				})),
		}));

		console.log(orders);

		// tạo order
		const map = orders.map(async (order) => {
			const province = await this.regionsService.getProvinceByCode(
				dto.provinceCode,
			);
			if (!province) throw new ApiException(ErrorMessages.PROVINCE_NOT_FOUND);

			const district = await this.regionsService.getDistrictByCode(
				dto.districtCode,
			);
			if (!district) throw new ApiException(ErrorMessages.DISTRICT_NOT_FOUND);

			const ward = await this.regionsService.getWardByCode(dto.wardCode);
			if (!ward) throw new ApiException(ErrorMessages.WARD_NOT_FOUND);

			const store = await this.storeService.selectOneStoreById(order.storeId);
			const orderDetailCreated = order.orderDetails.map(
				({ quantity, product, note }) => {
					return this.orderDetailRepository.create({
						note,
						quantity,
						product,
					});
				},
			);
			const orderDetails = await this.orderDetailRepository.save(
				orderDetailCreated,
			);

			const total = orderDetails.reduce(
				(acc, orderDetail) =>
					acc +
					orderDetail.product.productPrice.salePrice * orderDetail.quantity,
				0,
			);
			const orderCreated = this.orderRepository.create({
				store,
				total,
				user: myUser,
				province,
				district,
				ward,
				address: dto.address,
				orderDetails,
			});

			return await this.orderRepository.save(orderCreated);
		});

		return await Promise.all(map);
	}
	async getOrdersPagination(pagination: Pagination, storeId: number) {
		// tính tổng tiền productPrice.retailPrice * orderDetail.quantity
		const queryBuilder = this.orderRepository
			.createQueryBuilder('order')
			.leftJoinAndSelect('order.orderDetails', 'orderDetail')
			.leftJoinAndSelect('order.province', 'province')
			.leftJoinAndSelect('order.district', 'district')
			.leftJoinAndSelect('order.ward', 'ward')
			.leftJoinAndSelect('orderDetail.product', 'product')
			.leftJoinAndSelect('product.productPrice', 'productPrice')
			.leftJoinAndSelect('product.productCategory', 'productCategory')

			.leftJoinAndSelect('product.store', 'store')
			.orderBy('order.createdAt', pagination.order)
			// nếu có  storeId thì mới join
			.andWhere(storeId ? 'order.store_id = :storeId' : '1=1', {
				storeId,
			})
			.skip(pagination.skip)
			.take(pagination.take);
		const itemCount = await queryBuilder.getCount();
		const { entities } = await queryBuilder.getRawAndEntities();
		const meta = new Meta({ itemCount, pagination });
		return new PaginationModel(entities, meta);
	}

	async getMyOrdersPagination(pagination: Pagination, myUser: User) {
		// tính tổng tiền productPrice.retailPrice * orderDetail.quantity
		const queryBuilder = this.orderRepository
			.createQueryBuilder('order')
			.leftJoinAndSelect('order.province', 'province')
			.leftJoinAndSelect('order.district', 'district')
			.leftJoinAndSelect('order.ward', 'ward')
			.leftJoinAndSelect('order.orderDetails', 'orderDetail')
			.leftJoinAndSelect('orderDetail.product', 'product')
			.leftJoinAndSelect('product.productPrice', 'productPrice')
			.leftJoinAndSelect('product.productCategory', 'productCategory')
			.leftJoinAndSelect('product.store', 'store')
			.orderBy('order.createdAt', pagination.order)
			// nếu có  storeId thì mới join
			.andWhere(myUser ? 'order.user_id = :userId' : '1=1', {
				userId: myUser.id,
			})
			.skip(pagination.skip)
			.take(pagination.take);
		const itemCount = await queryBuilder.getCount();
		const { entities } = await queryBuilder.getRawAndEntities();
		const meta = new Meta({ itemCount, pagination });
		return new PaginationModel(entities, meta);
	}

	async selectOneOrderById(id: number) {
		return await this.orderRepository
			.createQueryBuilder('order')
			.leftJoinAndSelect('order.orderDetails', 'orderDetail')
			.leftJoinAndSelect('orderDetail.product', 'product')
			.leftJoinAndSelect('product.productPrice', 'productPrice')
			.leftJoinAndSelect('product.store', 'store')
			.where('order.id = :id', { id })
			.getOne();
	}

	async updateOrderStatus(dto: OrderStatusUpdateDto, id: number) {
		const order = await this.selectOneOrderById(id);
		if (!order) throw new ApiException(ErrorMessages.ORDER_NOT_FOUND);
		order.status = dto.status;
		return await this.orderRepository.save(order);
	}
}
