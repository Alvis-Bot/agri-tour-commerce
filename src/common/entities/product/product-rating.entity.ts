import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@/common/entities/user.entity';
import { Product } from '@/common/entities/product/product.entity';

@Entity('product_rating')
export class ProductRatingEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'varchar',
		length: 80,
		name: 'comment',
		nullable: true,
	})
	comment: string;

	@ManyToOne(() => User, (user) => user.ratings)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@ManyToOne(() => Product, (product) => product.ratings)
	@JoinColumn({ name: 'product_id' })
	product: Product;

	@Column({ type: 'decimal', precision: 3, scale: 2 })
	rating: number;
}
