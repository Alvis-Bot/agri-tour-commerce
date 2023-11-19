import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '@/common/entities/order.entity';
import { OrderDetail } from '@/common/entities/order-detail.entity';
import { ProductsModule } from '@/products/products.module';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([Order, OrderDetail])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
