import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@/common/entities/user.entity';
import { AuditEntity } from '@/common/entities/audit.entity';
import { ArticleCategory } from '@/common/entities/article-category.entity';

@Entity('articles')
export class Article extends AuditEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'varchar',
		length: 255,
	})
	title: string;

	@Column({
		type: 'text',
		nullable: true,
	})
	description: string;

	@Column({
		type: 'text',
	})
	content: string;

	@Column({
		nullable: true,
	})
	image: string;

	@ManyToOne(() => User, (user) => user.articles)
	user: User;

	@ManyToMany(() => ArticleCategory, (category) => category.articles)
	@JoinTable()
	categories: ArticleCategory[];
}
