import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { AuditEntity } from '@/common/entities/audit.entity';
import { OrderDetail } from '@/common/entities/order-detail.entity';
import { User } from '@/common/entities/user.entity';

@Entity('orders')
export class Order extends AuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, {
    cascade: true,
  })
  @JoinColumn({ name: 'order_id' })
  orderDetails: OrderDetail[];

  //tổng
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  // // trạng thái
  // @Column({ type: "varchar", length: 80 })
  // status: string;

  // note
  // lazy: true: khi lấy dữ liệu từ bảng này thì không lấy dữ liệu từ bảng kia
  @ManyToOne(() => User, (user) => user.orders, { lazy: true })
  @JoinColumn({ name: 'user_id' })
  user: Relation<User>;
}
