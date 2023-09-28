import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { BusinessType } from "@/common/enums/business-type";
import { User } from "@/common/entities/user";
import { AuditEntity } from "@/common/entities/audit.entity";
import { ProductCategory } from "@/common/entities/product-category.entity";

@Entity("shops")
export class Shop extends AuditEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ type : 'enum', enum: BusinessType, default: BusinessType.INDIVIDUAL})
  //loại hình doanh nghiệp
  type: BusinessType;

  @Column()
  //cmnd/cccd
  identity: string;

  @Column({ nullable: true })
  //mã thuế
  taxCode: string;

  //một shop có nhiều danh mục sản phẩm
  @OneToMany(() => ProductCategory, productCategory => productCategory.shop)
  productCategory: ProductCategory[];


  //một shop chỉ thuộc về một user
  @ManyToOne(() => User , user => user.shop)
  @JoinColumn({ name: "user_id" })
  user: Relation<User>;



}