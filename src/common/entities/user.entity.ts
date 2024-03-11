import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Province } from '@/common/entities/province.entity';
import { District } from '@/common/entities/district.entity';
import { Ward } from '@/common/entities/ward.entity';
import { Store } from '@/common/entities/store/store.entity';
import { UserRole } from '@/auth/role.builder';
import { Order } from '@/common/entities/order.entity';
import { ProductRatingEntity } from '@/common/entities/product/product-rating.entity';
import { AuditEntity } from '@/common/entities/audit.entity';
import { Article } from '@/common/entities/article.entity';

@Entity('users')
export class User extends AuditEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true, name: 'full_name' })
	fullName: string;

	@Column({ nullable: true, unique: true })
	uid: string;

	@Column({ nullable: true, unique: true })
	email: string;

	@Column({ nullable: true, unique: true })
	phone: string;

	@Column({ nullable: false })
	provider: string;

	@Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
	roles: UserRole;

	@Column({ nullable: false, default: true })
	isNew: boolean;

	@Column({
		nullable: true,
	})
	address: string;

	@ManyToOne(() => Province)
	@JoinColumn({ name: 'province_code' })
	province: Province;

	@ManyToOne(() => District)
	@JoinColumn({ name: 'district_code' })
	district: District;

	@ManyToOne(() => Ward)
	@JoinColumn({ name: 'ward_code' })
	ward: Ward;

	@OneToOne(() => Store, (store) => store.user, {
		onDelete: 'CASCADE', // delete user nó sẽ xóa luôn store
		lazy: true, // tải store khi cần thiết
	})
	@JoinColumn({ name: 'store_id' })
	store: Store;

	@OneToMany(() => Order, (order) => order.user)
	orders: Order[];

	@OneToMany(() => ProductRatingEntity, (ratings) => ratings.user)
	ratings: ProductRatingEntity[];

	@OneToMany(() => Article, (article) => article.user)
	articles: Article[];
}
