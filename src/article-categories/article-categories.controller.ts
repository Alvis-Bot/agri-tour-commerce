import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { Note } from '@/common/decorator/note.decorator';
import { Public } from '@/common/decorator/public.meta';
import { ArticleCategoryCreateDto } from '@/article-categories/dto/article-category-create.dto';
import { ArticleCategoriesService } from '@/article-categories/article-categories.service';
import { ArticleCategoryUpdateDto } from '@/article-categories/dto/article-category-update.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('article-categories')
@ApiTags('APIs article categories - API danh mục bài viết')
export class ArticleCategoriesController {
	constructor(
		private readonly articleCategoriesService: ArticleCategoriesService,
	) {}

	@Post()
	@Public()
	@Note('Tạo mới danh mục bài viết')
	async create(@Body() dto: ArticleCategoryCreateDto) {
		return await this.articleCategoriesService.createArticleCategory(dto);
	}

	@Get()
	@Public()
	@Note('Lấy danh sách danh mục bài viết')
	async getArticleCategories() {
		return await this.articleCategoriesService.getArticleCategories();
	}

	@Patch()
	@Public()
	@Note('Cập nhật danh mục bài viết')
	async updateArticleCategory(@Body() dto: ArticleCategoryUpdateDto) {
		// update article category
		return await this.articleCategoriesService.updateArticleCategory(dto);
	}

	@Delete(':articleCategoryId')
	@Public()
	@Note('Xóa danh mục bài viết')
	@ApiParam({
		name: 'articleCategoryId',
		description: 'Id của danh mục bài viết',
		type: Number,
	})
	async deleteArticleCategory(
		@Param('articleCategoryId') articleCategoryId: number,
	) {
		// delete article category
		return await this.articleCategoriesService.deleteArticleCategory(
			articleCategoryId,
		);
	}
}
