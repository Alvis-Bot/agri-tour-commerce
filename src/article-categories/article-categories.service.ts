import { Injectable } from '@nestjs/common';
import { ArticleCategoryCreateDto } from '@/article-categories/dto/article-category-create.dto';
import { ArticleCategory } from '@/common/entities/article-category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiException } from '@/exception/api.exception';
import { ErrorMessages } from '@/exception/error.code';
import { ArticleCategoryUpdateDto } from '@/article-categories/dto/article-category-update.dto';

@Injectable()
export class ArticleCategoriesService {
	constructor(
		@InjectRepository(ArticleCategory)
		private readonly articleCategoryRepository: Repository<ArticleCategory>,
	) {}
	async createArticleCategory(dto: ArticleCategoryCreateDto) {
		// create article category
		const articleCategory = this.articleCategoryRepository.create(dto);
		try {
			await this.articleCategoryRepository.save(articleCategory);
			return articleCategory;
		} catch (e) {
			// check if category name existed
			if (e.code === '23505') {
				throw new ApiException(ErrorMessages.CATEGORY_NAME_EXISTED);
			}
		}
	}

	async getArticleCategories() {
		return await this.articleCategoryRepository.find();
	}

	async findArticleCategoryById(id: number) {
		return await this.articleCategoryRepository.findOne({ where: { id } });
	}

	async updateArticleCategory(dto: ArticleCategoryUpdateDto) {
		// find article category
		const articleCategory = await this.findArticleCategoryById(
			dto.articleCategoryId,
		);
		if (!articleCategory)
			throw new ApiException(ErrorMessages.ARTICLE_CATEGORY_NOT_FOUND);

		// update article category
		articleCategory.name = dto.name;
		return await this.articleCategoryRepository.save(articleCategory);
	}

	async deleteArticleCategory(articleCategoryId: number) {
		// delete article category
		return await this.articleCategoryRepository
			.createQueryBuilder('articleCategory')
			.delete()
			.from(ArticleCategory)
			.where('id = :id', { id: articleCategoryId })
			.returning('*')
			.execute();
	}
}
