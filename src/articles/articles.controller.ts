import {
	Body,
	Controller,
	Get,
	Post,
	Query,
	UploadedFile,
	UseGuards,
} from '@nestjs/common';
import { ArticlesService } from '@/articles/articles.service';
import { ArticleCreateDto } from '@/articles/dto/article-create.dto';
import { AuthUser } from '@/common/decorator/user.decorator';
import { User } from '@/common/entities/user.entity';
import { FirebaseAuthGuard } from '@/auth/guard/firebase-auth.guard';
import { Pagination } from '@/common/pagination/pagination.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Note } from '@/common/decorator/note.decorator';
import { ApiFile } from '@/common/decorator/file.decorator';
import { UploadTypesEnum } from '@/common/enums/upload-types.enum';
import { MulterUtils } from '@/common/utils/multer.utils';

@Controller('articles')
@UseGuards(FirebaseAuthGuard)
@ApiTags('Article APIs - Quản lý bài viết')
export class ArticlesController {
	constructor(private readonly articlesService: ArticlesService) {}

	@Post()
	@Note('Tạo bài viết')
	@ApiFile('image', MulterUtils.getConfig(UploadTypesEnum.IMAGES))
	async create(
		@UploadedFile() image: Express.Multer.File,
		@AuthUser() user: User,
		@Body() dto: ArticleCreateDto,
	) {
		return await this.articlesService.create(dto, user, image);
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
