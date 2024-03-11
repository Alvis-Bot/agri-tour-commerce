import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { Routers } from '@/common/enums/routers';
import { OrdersService } from '@/orders/orders.service';
import { OrderCreateDto } from '@/orders/dto/order-create.dto';
import { Pagination } from '@/common/pagination/pagination.dto';
import { FirebaseAuthGuard } from '@/auth/guard/firebase-auth.guard';
import { AuthUser } from '@/common/decorator/user.decorator';
import { User } from '@/common/entities/user.entity';
import { ApiParam, ApiQuery } from '@nestjs/swagger';
import { Note } from '@/common/decorator/note.decorator';
import { OrderStatusUpdateDto } from '@/orders/dto/order-status-update.dto';

@Controller(Routers.ORDERS)
@UseGuards(FirebaseAuthGuard)
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Post()
	@Note('Tạo mới đơn hàng')
	async createOrder(@AuthUser() myUser: User, @Body() dto: OrderCreateDto) {
		return await this.ordersService.createOrder(dto, myUser);
	}

	@Get()
	@ApiQuery({
		name: 'storeId',
		description: 'Id của store',
		type: Number,
		required: false,
	})
	@Note('Lấy danh sách đơn hàng')
	async getOrders(
		@Query() pagination: Pagination,
		@Query('storeId') storeId: number,
	) {
		return await this.ordersService.getOrdersPagination(pagination, storeId);
	}

	@Get('me')
	@Note('Lấy danh sách đơn hàng của tôi')
	async getMyOrders(@AuthUser() myUser: User, @Query() pagination: Pagination) {
		return await this.ordersService.getMyOrdersPagination(pagination, myUser);
	}

	@ApiParam({
		name: 'id',
		description: 'Id của đơn hàng',
		type: Number,
	})
	@Patch(':id')
	@Note('cập nhật trạng thái đơn hàng')
	async updateOrderStatus(
		@Body() dto: OrderStatusUpdateDto,
		@Param('id') id: number,
	) {
		return await this.ordersService.updateOrderStatus(dto, id);
	}

	// lấy thông tin đơn hàng của tôi gần nhất
	@Get('latest')
	@Note('Lấy thông tin đơn hàng của tôi gần nhất')
	async getLatestOrder(@AuthUser() myUser: User) {
		return await this.ordersService.getLatestOrder(myUser);
	}
}
