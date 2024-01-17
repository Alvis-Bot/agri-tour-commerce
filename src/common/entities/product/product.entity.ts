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

	// ma sản phẩm /sku
	@Column({ type: 'varchar', length: 80 })
	sku: string;

	// khối lượng
	@Column({ type: 'varchar', length: 80 })
	weight: string;

	// mã vạch/ barcode
	@Column({ type: 'varchar', length: 80 })
	barcode: string;

	//  đơn vị tính
	@Column({ type: 'varchar', length: 80 })
	unit: string;

	// mo ta
	@Column({ type: 'text' })
	description: string;

	//chú thích
	@Column({ type: 'text' })
	note: string;
	// cho phép bán
	@Column({ type: 'boolean', default: false })
	isAllowSale: boolean;

	// áp dụng thuế
	@Column({ type: 'boolean', default: false })
	isApplyTax: boolean;

	@OneToOne(() => ProductPrice)
	@JoinColumn({ name: 'product_price_id' })
	price: ProductPrice;

	//ảnh sản phẩm
	@Column('simple-array')
	images: string[];

	@ManyToOne(() => ProductCategory)
	@JoinColumn({ name: 'product_category_id' })
	category: ProductCategory;

	@ManyToOne(() => Store, (store) => store.products)
	@JoinColumn({ name: 'store_id' })
	store: Store;

	@OneToMany(() => ProductRatingEntity, (ratings) => ratings.product, {
		cascade: true,
	})
	ratings: ProductRatingEntity[];
}
