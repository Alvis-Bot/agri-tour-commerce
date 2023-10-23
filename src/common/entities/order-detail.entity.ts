import { Product } from "@/common/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Order } from "@/common/entities/order.entity";

@Entity('order-details')
export class OrderDetail {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Relation<Product>;

  @ManyToOne(() => Order, order => order.orderDetails)
  order: Relation<Order>;

  @Column()
  quantity: number;

}