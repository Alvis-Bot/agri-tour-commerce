import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '@/common/entities/product/product.entity';

@Entity('product-categories')
export class ProductCategory {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ nullable: true })
	image: string;
	// một danh mục sản phẩm có nhiều sản phẩm
	@OneToMany(() => Product, (product) => product.category)
	product: Product[];
}
