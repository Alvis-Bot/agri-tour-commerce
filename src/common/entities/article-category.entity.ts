import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from '@/common/entities/article.entity';

@Entity('article_category')
export class ArticleCategory {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'varchar',
		length: 255,
		unique: true,
	})
	name: string;

	@ManyToMany(() => Article, (article) => article.categories)
	@JoinTable()
	articles: Article[];
}
