import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '@/common/entities/user.entity'
import { Product } from '@/common/entities/product/product.entity'

@Entity('product_rating')
export class ProductRatingEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, user => user.ratings)
  user: User

  @ManyToOne(() => Product, product => product.ratings)
  product: Product

  @Column({ type: 'decimal', precision: 3, scale: 2 })
  rating: number
}
