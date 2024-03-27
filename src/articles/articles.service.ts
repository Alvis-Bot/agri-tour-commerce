import { Article } from '@/common/entities/article.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleCreateDto } from '@/articles/dto/article-create.dto';
import { User } from '@/common/entities/user.entity';
import { Pagination } from '@/common/pagination/pagination.dto';
import { Meta } from '@/common/pagination/meta.dto';
import { PaginationModel } from '@/common/pagination/pagination.model';
import { ArticleCategoriesService } from '@/article-categories/article-categories.service';
import { ApiException } from '@/exception/api.exception';
import { ErrorMessages } from '@/exception/error.code';

@Injectable()
export class ArticlesService {
	constructor(
		private readonly articleCategoriesService: ArticleCategoriesService,
		@InjectRepository(Article)
		private readonly articleRepository: Repository<Article>,
	) {}

	async create(
		article: ArticleCreateDto,
		user: User,
		image: Express.Multer.File,
	): Promise<Article> {
		// kiểm tra xem category có tồn tại không
		const categories = await Promise.all(
			article.articleCategories.map(async (categoryId) => {
				const category =
					await this.articleCategoriesService.findArticleCategoryById(
						categoryId,
					);
				if (!category) {
					throw new ApiException(ErrorMessages.CATEGORY_PRODUCT_NOT_FOUND);
				}
				return category;
			}),
		);
		const createdArticle = this.articleRepository.create({
			...article,
			user,
			image: image?.filename,
			categories,
		});
		return await this.articleRepository.save(createdArticle);
	}

	async select(pagination: Pagination, userId: number, search: string) {
		const queryBuilder = this.articleRepository
			.createQueryBuilder('article')
			.leftJoinAndSelect('article.user', 'user')
			.leftJoinAndSelect('article.categories', 'categories')
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
