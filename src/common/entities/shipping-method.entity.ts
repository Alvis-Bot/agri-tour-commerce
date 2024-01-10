import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'shipping_methods' })
export class ShippingMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, name: 'name' })
  name: string;

  @Column({ nullable: true, name: 'description' })
  description: string;
}
