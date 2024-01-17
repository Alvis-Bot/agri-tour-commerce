import {
	Column,
	Entity,
	Index,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@/common/entities/user.entity';
import { Location } from '@/common/entities/store/location.entity';
import { Product } from '@/common/entities/product/product.entity';
import { Order } from '@/common/entities/order.entity';
import { Identity } from '@/common/entities/store/identity.entity';
import { DeliveryOption } from '@/common/entities/store/delivery-option.entity';
import { BusinessType } from '@/common/enums/business-type';
import { AuditEntity } from '@/common/entities/audit.entity';

@Entity('stores')
export class Store extends AuditEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Index()
	@Column()
	name: string;

	@Column()
	phone: string;

	@Column({
		nullable: false,
		type: 'enum',
		enum: BusinessType,
		default: BusinessType.INDIVIDUAL,
	})
	//loại hình doanh nghiệp
	type: BusinessType;

	@Column({ nullable: true })
	taxCode?: string;

	@Column({ nullable: true })
	companyName?: string;

	@Column({ array: true, nullable: true, type: 'text' })
	emailInvoice?: string[];

	@Column({ nullable: true })
	businessLicense: string;

	@OneToOne(() => User, (user) => user.store)
	user: User;

	@OneToOne(() => Identity)
	@JoinColumn({ name: 'identity_id' })
	identity: Identity;

	@OneToMany(() => Location, (location) => location.store, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	locations: Location[];

	@OneToMany(() => DeliveryOption, (deliveryOption) => deliveryOption.store)
	deliveryOptions: DeliveryOption[];

	@OneToMany(() => Product, (product) => product.store)
	products: Product[];

	@OneToMany(() => Order, (order) => order.store)
	orders: Order[];
}
