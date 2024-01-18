import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product-prices')
export class ProductPrice {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'decimal',
		precision: 10,
		scale: 2,
		default: 0,
		transformer: {
			from: (value: string) => parseFloat(value),
			to: (value: number) => value,
		},
	})
	// giá bán lẻ
	retailPrice: number;

	@Column({
		type: 'decimal',
		precision: 10,
		scale: 2,
		default: 0,
		transformer: {
			from: (value: string) => parseFloat(value),
			to: (value: number) => value,
		},
	})
	// giá khuyến mãi
	salePrice: number;
	// ngày bắt đầu khuyến mãi
	@Column({ type: 'timestamp', nullable: true })
	saleStartDate: Date;

	// ngày kết thúc khuyến mãi
	@Column({ type: 'timestamp', nullable: true })
	saleEndDate: Date;
}
