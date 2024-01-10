import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { BusinessType } from '@/common/enums/business-type';
import { User } from '@/common/entities/user.entity';
import { AuditEntity } from '@/common/entities/audit.entity';
import { Product } from '@/common/entities/product.entity';
import { Province } from '@/common/entities/province.entity';
import { District } from '@/common/entities/district.entity';
import { Ward } from '@/common/entities/ward.entity';
import { ShippingMethod } from '@/common/entities/shipping-method.entity';

@Entity('shops')
export class Shop extends AuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ type: 'json', default: [] })
  //địa chỉ lấy hàng
  pickupAddress: string[];

  @Column({ nullable: true })
  @Column({
    nullable: false,
    type: 'enum',
    enum: BusinessType,
    default: BusinessType.INDIVIDUAL,
  })
  //loại hình doanh nghiệp
  type: BusinessType;

  @ManyToOne(() => Province)
  @JoinColumn({ name: 'province_code' })
  province: Relation<Province>;

  @ManyToOne(() => District)
  @JoinColumn({ name: 'district_code' })
  district: Relation<District>;

  @ManyToOne(() => Ward)
  @JoinColumn({ name: 'ward_code' })
  ward: Relation<Ward>;

  @Column({
    nullable: true,
  })
  address: string;

  @Column({ nullable: true, name: 'tax_code' })
  //mã thuế
  taxCode?: string;

  // tên cong ty
  @Column({ nullable: true, name: 'company_name' })
  companyName?: string;

  //step
  @Column({ nullable: false, name: 'step', default: 1 })
  step: number;

  @Column({ nullable: true, name: 'business_license' })
  businessLicense: string;

  @Column({ nullable: true, name: 'identity' })
  identity: string;

  @Column({ nullable: true, name: 'avatar' })
  avatar: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: Partial<User>;

  @ManyToMany(() => ShippingMethod)
  @JoinTable()
  shippingMethods: ShippingMethod[];

  //một shop có nhiều sản phẩm
  @OneToMany(() => Product, (product) => product.shop)
  products: Product[];
}
