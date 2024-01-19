import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCategory } from '@/common/entities/product/product-category.entity';
import { Store } from '@/common/entities/store/store.entity';
import { ProductRatingEntity } from '@/common/entities/product/product-rating.entity';
import { AuditEntity } from '@/common/entities/audit.entity';
import { ProductPrice } from '@/common/entities/product/product-price.entity';

@Entity('products')
export class Product extends AuditEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'varchar',
		length: 80,
	})
	// tên sản phẩm
	name: string;

	// khối lượng
	@Column()
	weight: number;

	//  đơn vị tính
	@Column({
		type: 'varchar',
		length: 80,
	})
	unit: string;

	// số lượng tồn
	@Column({ type: 'int', default: 0 })
	inventory: number;

	// mo ta
	@Column({ type: 'text' })
	description: string;

	@Column({ type: 'boolean', default: false })
	isActive: boolean;

	@OneToOne(() => ProductPrice)
	@JoinColumn({ name: 'product_price_id' })
	productPrice: ProductPrice;

	//ảnh sản phẩm
	@Column('simple-array')
	images: string[];

	@ManyToOne(() => ProductCategory)
	@JoinColumn({ name: 'product_category_id' })
	productCategory: ProductCategory;

	@ManyToOne(() => Store, (store) => store.products)
	@JoinColumn({ name: 'store_id' })
	store: Store;

	@OneToMany(() => ProductRatingEntity, (ratings) => ratings.product, {
		cascade: true,
	})
	ratings: ProductRatingEntity[];
}
