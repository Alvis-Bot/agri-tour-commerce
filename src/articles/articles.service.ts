import { Article } from '@/common/entities/article.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleCreateDto } from '@/articles/dto/article-create.dto';
import { User } from '@/common/entities/user.entity';
import { Pagination } from '@/common/pagination/pagination.dto';
import { Meta } from '@/common/pagination/meta.dto';
import { PaginationModel } from '@/common/pagination/pagination.model';

@Injectable()
export class ArticlesService {
	constructor(
		@InjectRepository(Article)
		private readonly articleRepository: Repository<Article>,
	) {}

	async create(article: ArticleCreateDto, user: User): Promise<Article> {
		const createdArticle = this.articleRepository.create({
			...article,
			user,
		});
		return await this.articleRepository.save(createdArticle);
	}

	async select(pagination: Pagination, userId: number, search: string) {
		const queryBuilder = this.articleRepository
			.createQueryBuilder('article')
			.leftJoinAndSelect('article.user', 'user')
			.take(pagination.take)
			.skip(pagination.skip)
			.orderBy('article.createdAt', pagination.order);

		if (userId) {
			queryBuilder.where('article.userId = :userId', { userId });
		}
		if (search) {
			queryBuilder.where('article.title like :search', {
				search: `%${search}%`,
			});
		}

		const itemCount = await this.articleRepository.count();
		const { entities } = await queryBuilder.getRawAndEntities();
		const meta = new Meta({ itemCount, pagination });
		return new PaginationModel(entities, meta);
	}

	async selectByUserId(userId: User, pagination: Pagination, search: string) {
		const queryBuilder = this.articleRepository
			.createQueryBuilder('article')
			.leftJoinAndSelect('article.user', 'user')
			.where('article.userId = :userId', { userId: userId.id })
			.take(pagination.take)
			.skip(pagination.skip)
			.orderBy('article.createdAt', pagination.order);

		if (search) {
			queryBuilder.where('article.title like :search', {
				search: `%${search}%`,
			});
		}

		const itemCount = await this.articleRepository.count();
		const { entities } = await queryBuilder.getRawAndEntities();
		const meta = new Meta({ itemCount, pagination });
		return new PaginationModel(entities, meta);
	}
}
