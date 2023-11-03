import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Index, Relation, OneToMany } from "typeorm";
import { ProductCategory } from "@/common/entities/product-category.entity";
import { ApproveStatus } from "@/common/enums/approve-status";
import { Shop } from "@/common/entities/shop.entity";
import { ProductRatingEntity } from "@/common/entities/product-rating.entity";
import { AuditEntity } from "@/common/entities/audit.entity";

@Entity("products")
export class Product extends AuditEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 80 })
  name: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  salePrice: number;

  @Column({ type: "timestamp" })
  saleStartDate: Date;

  @Column({ type: "timestamp" })
  saleEndDate: Date;

  @Column({ type: "int" })
  quantity: number;

  @Column({ type: "simple-array" , nullable: true })
  images: string[];

  @Column({ type: "int" })
  inventory: number;

  @Column({ type: "boolean", default: true })
  status: boolean;

  @Column({ type: "enum", enum: ApproveStatus, default: ApproveStatus.PENDING , name: "approve_status" })
  approveStatus: ApproveStatus;

  @Column({ type: "text" })
  description: string;

  @ManyToOne(() => ProductCategory)
  @JoinColumn({ name: "product_category_id" } )
  category: Relation<ProductCategory>;

  @ManyToOne(() => Shop, (shop) => shop.products, { lazy: true })
  @JoinColumn({ name: "shop_id" })
  shop: Relation<Shop>;

  @OneToMany(() => ProductRatingEntity, ratings => ratings.product, { cascade: true })
  ratings: ProductRatingEntity[];
}
