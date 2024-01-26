import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ArticlesService } from '@/articles/articles.service';
import { ArticleCreateDto } from '@/articles/dto/article-create.dto';
import { AuthUser } from '@/common/decorator/user.decorator';
import { User } from '@/common/entities/user.entity';
import { FirebaseAuthGuard } from '@/auth/guard/firebase-auth.guard';
import { Pagination } from '@/common/pagination/pagination.dto';
import { ApiQuery } from '@nestjs/swagger';
import { Note } from '@/common/decorator/note.decorator';

@Controller('articles')
@UseGuards(FirebaseAuthGuard)
export class ArticlesController {
	constructor(private readonly articlesService: ArticlesService) {}

	@Post()
	@Note('Tạo bài viết')
	async create(@AuthUser() user: User, @Body() dto: ArticleCreateDto) {
		return await this.articlesService.create(dto, user);
	}

	@Get()
	@Note('Lấy danh sách bài viết')
	@ApiQuery({ name: 'userId', required: false })
	@ApiQuery({ name: 'search', required: false })
	async findAll(
		@Query() pagination: Pagination,
		@Query('userId') userId: number,
		@Query('search') search: string,
	) {
		return await this.articlesService.select(pagination, userId, search);
	}

	@Get('me')
	@Note('Lấy danh sách bài viết của tài khoản')
	@ApiQuery({ name: 'search', required: false })
	async findByUserId(
		@Query('search') search: string,
		@Query() pagination: Pagination,
		@AuthUser() user: User,
	) {
		return await this.articlesService.selectByUserId(user, pagination, search);
	}
}
