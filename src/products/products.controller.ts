import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Query,
	UploadedFiles,
	UseGuards,
} from '@nestjs/common';
import { Routers } from '@/common/enums/routers';
import { ProductsService } from '@/products/products.service';
import { ApiFiles } from '@/common/decorator/file.decorator';
import { MulterUtils } from '@/common/utils/multer.utils';
import { UploadTypesEnum } from '@/common/enums/upload-types.enum';
import { ProductCreateDto } from '@/products/dto/product-create.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Note } from '@/common/decorator/note.decorator';
import { ProductQueryDto } from '@/products/dto/product-query.dto';
import { Pagination } from '@/common/pagination/pagination.dto';
import { FirebaseAuthGuard } from '@/auth/guard/firebase-auth.guard';
import { RoleGuard } from '@/auth/guard/role.guard';
import { RolesEnum } from '@/common/enums/roles.enum';
import { Roles } from '@/common/decorator/roles.decorator';
import { Public } from '@/common/decorator/public.meta';

@Controller(Routers.PRODUCTS)
@ApiTags('APIs for product - APIs sản phẩm')
@UseGuards(FirebaseAuthGuard, RoleGuard)
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Roles(RolesEnum.SHOP)
	@Post(':storeId')
	@ApiParam({
		name: 'storeId',
		description: 'Id của store',
		type: Number,
	})
	@Note('Tạo mới sản phẩm')
	@ApiFiles(
		'images',
		10,
		MulterUtils.getConfig(UploadTypesEnum.IMAGES_AND_VIDEOS),
	)
	async createProduct(
		@Param('storeId') storeId: number,
		@UploadedFiles() files: Express.Multer.File[],
		@Body() dto: ProductCreateDto,
	) {
		return await this.productsService.createProduct(dto, files, storeId);
	}

	@ApiParam({
		name: 'id',
		description: 'Id của sản phẩm',
		type: Number,
	})
	@Public()
	@Get(':id')
	@Note('Lấy thông tin sản phẩm')
	async getProductById(@Param('id') id: number) {
		return await this.productsService.getProductById(id);
	}

	@Get()
	@Public()
	@Note('Lấy danh sách sản phẩm')
	async getProducts(
		@Query() pagination: Pagination,
		@Query() dto: ProductQueryDto,
	) {
		return await this.productsService.getProductsPagination(dto, pagination);
	}
}
