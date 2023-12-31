import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BusinessType } from '@/common/enums/business-type';
import { User } from '@/common/entities/user.entity';
import { AuditEntity } from '@/common/entities/audit.entity';
import { Product } from '@/common/entities/product.entity';

@Entity('shops')
export class Shop extends AuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({
    type: 'enum',
    enum: BusinessType,
    default: BusinessType.INDIVIDUAL,
  })
  //loại hình doanh nghiệp
  type: BusinessType;

  @Column()
  //cmnd/cccd
  identity: string;

  @Column({ nullable: true, name: 'tax_code' })
  //mã thuế
  taxCode?: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: Partial<User>;

  //một shop có nhiều sản phẩm
  @OneToMany(() => Product, (product) => product.shop)
  products: Product[];
}
