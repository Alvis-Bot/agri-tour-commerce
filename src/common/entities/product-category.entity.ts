


import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Shop } from "@/common/entities/shop.entity";

@Entity("product-categories")
export class ProductCategory{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    image: string;

   // một danh mục sản phẩm chỉ thuộc về một shop
    @ManyToOne(() => Shop , shop => shop.productCategory)
    @JoinColumn({ name: "shop_id" })
    shop: Relation<Shop>;

}