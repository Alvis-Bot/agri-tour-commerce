import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DeliveryMethod } from '@/common/entities/store/delivery-method.entity';
import { Store } from '@/common/entities/store/store.entity';

@Entity('delivery_options')
export class DeliveryOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'is_locked',
  })
  isLocked: boolean;

  @ManyToOne(() => Store, (store) => store.deliveryOptions)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @OneToOne(() => DeliveryMethod)
  @JoinColumn({ name: 'delivery_method_id' })
  deliveryMethod: DeliveryMethod;
}