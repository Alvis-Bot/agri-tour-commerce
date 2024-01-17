import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('delivery_methods')
export class DeliveryMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'title',
  })
  title: string;

  @Column({
    name: 'description',
    nullable: true,
  })
  description?: string;
}
