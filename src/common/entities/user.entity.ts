import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Province } from "@/common/entities/province.entity";
import { District } from "@/common/entities/district.entity";
import { Ward } from "@/common/entities/ward.entity";
import { Shop } from "@/common/entities/shop.entity";
import { UserRole } from "@/auth/role.builder";
import { Order } from "@/common/entities/order.entity";
import { ProductRatingEntity } from "@/common/entities/product-rating.entity";


@Entity("users")
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true  , name: 'full_name' })
  fullName: string;

  @Column({ nullable: true, unique: true })
  uid: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: true, unique: true })
  phone: string;

  @Column({ nullable: false })
  provider: string;

  @Column({ type : 'enum' , enum: UserRole, default: UserRole.USER})
  roles:UserRole;

  @Column({ nullable: false, default: true })
  isNew: boolean;

  @ManyToOne(() => Province)
  @JoinColumn({ name: "province_code" })
  province: Relation<Province>;

  @ManyToOne(() => District)
  @JoinColumn({ name: "district_code" })
  district: Relation<District>;

  @ManyToOne(() => Ward)
  @JoinColumn({ name: "ward_code" })
  ward: Relation<Ward>;

  @OneToOne(() => Shop, (shop) => shop.user, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  @JoinColumn({ name: "shop_id" })
  shop: Relation<Shop>;

  @OneToMany(() => Order, order => order.user, { cascade: true })
  orders: Order[];

  @OneToMany(() => ProductRatingEntity, ratings => ratings.user, { cascade: true })
  ratings: ProductRatingEntity[];

}