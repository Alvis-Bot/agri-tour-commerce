


import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Product } from "@/common/entities/product.entity";

@Entity("product-categories")
export class ProductCategory{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "text", nullable: true})
    image: string;
    // một danh mục sản phẩm có nhiều sản phẩm
    @OneToMany(() => Product, product => product.category)
    product:Relation<Product[]>

}