import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { User } from "@/common/entities/user.entity";
import { Product } from "@/common/entities/product.entity";


@Entity("product_rating")
export class ProductRatingEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.ratings)
  user: Relation<User>;

  @ManyToOne(() => Product, product => product.ratings)
  product: Relation<Product>;

  @Column({ type: 'decimal', precision: 3, scale: 2 })
  rating: number;


}