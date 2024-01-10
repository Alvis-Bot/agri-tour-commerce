import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Shop } from '@/common/entities/shop.entity';

@Entity({ name: 'shipping_methods' })
export class ShippingMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, name: 'name' })
  name: string;

  @Column({ nullable: true, name: 'description' })
  description: string;

  @ManyToOne(() => Shop, (shop) => shop.shippingMethods)
  shop: Relation<Shop>;
}
