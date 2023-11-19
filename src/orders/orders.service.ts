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

@Injectable()
export class OrdersService {
  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
  ) {}

  async createOrder(dto: OrderCreateDto, myUser: User) {
    const orderDetails = await Promise.all(
      dto.orderDetails.map(async (orderDetail) => ({
        ...orderDetail,
        product: await this.productsService.getProductById(
          orderDetail.productId,
        ),
      })),
    );

    const total = orderDetails.reduce(
      (total, orderDetail) =>
        total + orderDetail.product.price * orderDetail.quantity,
      0,
    );

    const order = this.orderRepository.create({
      ...dto,
      orderDetails,
      total,
      user: myUser,
    });

    return await this.orderRepository.save(order);
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
