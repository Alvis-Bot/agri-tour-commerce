import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product-prices')
export class ProductPrice {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
	// giá bán lẻ
	retailPrice: number;

	@Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
	// giá phân phối
	distributionPrice: number;

	@Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
	// giá khuyến mãi
	promotionPrice: number;
}
