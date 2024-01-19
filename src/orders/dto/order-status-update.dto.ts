import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatus } from '@/common/entities/order.entity';
import { ApiProperty } from '@nestjs/swagger';

export class OrderStatusUpdateDto {
	@IsNotEmpty()
	@IsEnum(OrderStatus)
	@ApiProperty({ enum: OrderStatus, default: OrderStatus.PENDING })
	status: OrderStatus;
}
