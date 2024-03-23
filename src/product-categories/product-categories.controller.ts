import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UploadedFile,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UploadTypesEnum } from '@/common/enums/upload-types.enum';
import { MulterUtils } from '@/common/utils/multer.utils';
import { ApiFile } from '@/common/decorator/file.decorator';
import { ProductCategoriesService } from '@/product-categories/product-categories.service';
import { ProductCategoryCreate } from '@/product-categories/dto/product-category-create';
import { Note } from '@/common/decorator/note.decorator';
import { FirebaseAuthGuard } from '@/auth/guard/firebase-auth.guard';
import { Public } from '@/common/decorator/public.meta';
import { RoleGuard } from '@/auth/guard/role.guard';

@Controller('product-categories')
@ApiTags('APIs product categories - API danh mục sản phẩm')
@UseGuards(FirebaseAuthGuard, RoleGuard)
export class ProductCategoriesController {
	constructor(
		private readonly productCategoriesService: ProductCategoriesService,
	) {}

	@Post()
	@Public()
	@Note('Tạo mới danh mục sản phẩm')
	@ApiFile('image', MulterUtils.getConfig(UploadTypesEnum.IMAGES))
	async create(
		@Body() dto: ProductCategoryCreate,
		@UploadedFile() image: Express.Multer.File,
	) {
		return await this.productCategoriesService.createProductCategory(
			image,
			dto,
		);
	}

	@Get()
	@Public()
	@Note('Lấy danh sách danh mục sản phẩm')
	async getProductCategories() {
		return await this.productCategoriesService.getProductCategories();
	}

	@Delete(':id')
	@Public()
	@Note('Xóa danh mục sản phẩm')
	async deleteProductCategories(@Param('id') id: number) {
		return await this.productCategoriesService.deleteProductCategories(id);
	}
}
