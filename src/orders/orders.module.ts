import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '@/common/entities/order.entity';
import { OrderDetail } from '@/common/entities/order-detail.entity';
import { ProductsModule } from '@/products/products.module';
import { StoresModule } from '@/stores/stores.module';

@Module({
	imports: [
		ProductsModule,
		StoresModule,
		TypeOrmModule.forFeature([Order, OrderDetail]),
	],
	controllers: [OrdersController],
	providers: [OrdersService],
})
export class OrdersModule {}
