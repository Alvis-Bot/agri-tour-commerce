import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditEntity } from '@/common/entities/audit.entity';
import { OrderDetail } from '@/common/entities/order-detail.entity';
import { User } from '@/common/entities/user.entity';
import { Store } from '@/common/entities/store/store.entity';

@Entity('orders')
export class Order extends AuditEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
	orderDetails: OrderDetail[];

	//tổng
	@Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
	total: number;

	// order thuộc store nào
	@ManyToOne(() => Store, (store) => store.orders, { lazy: true })
	@JoinColumn({ name: 'store_id' })
	store: Store;

	// order thuộc về user nào
	@ManyToOne(() => User, (user) => user.orders)
	@JoinColumn({ name: 'user_id' })
	user: User;
}
