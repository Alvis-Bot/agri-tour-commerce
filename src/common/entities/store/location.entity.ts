import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Province } from '@/common/entities/province.entity';
import { District } from '@/common/entities/district.entity';
import { Ward } from '@/common/entities/ward.entity';
import { Store } from '@/common/entities/store/store.entity';

export enum LocationType {
	COLLECTION = 'COLLECTION', //  địa chỉ lấy hàng
	STORE = 'STORE', // địa chỉ cửa hàng
	BUSINESS = 'BUSINESS', //	//địa chỉ khinh doanh
}
@Entity('locations')
export class Location {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	address: string;

	@Column({
		nullable: false,
		type: 'enum',
		enum: LocationType,
		default: LocationType.COLLECTION,
	})
	// loại địa điểm
	type: LocationType;

	@ManyToOne(() => Province)
	@JoinColumn({ name: 'province_code' })
	province: Province;

	@ManyToOne(() => District)
	@JoinColumn({ name: 'district_code' })
	district: District;

	@ManyToOne(() => Ward)
	@JoinColumn({ name: 'ward_code' })
	ward: Ward;

	@ManyToOne(() => Store, (store) => store.locations)
	@JoinColumn({ name: 'store_id' })
	store: Store;
}
