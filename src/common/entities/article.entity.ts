import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@/common/entities/user.entity';
import { AuditEntity } from '@/common/entities/audit.entity';

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
	})
	content: string;

	@ManyToOne(() => User, (user) => user.articles)
	user: User;
}
