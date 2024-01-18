import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Query,
	UploadedFiles,
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

@Controller(Routers.PRODUCTS)
@ApiTags('APIs for product - APIs sản phẩm')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

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
	@Get(':id')
	@Note('Lấy thông tin sản phẩm')
	async getProductById(@Param('id') id: number) {
		return await this.productsService.getProductById(id);
	}

	@Get()
	@Note('Lấy danh sách sản phẩm')
	async getProducts(
		@Query() pagination: Pagination,
		@Query() dto: ProductQueryDto,
	) {
		return await this.productsService.getProductsPagination(dto, pagination);
	}

	@Get('store/:id')
	@ApiParam({
		name: 'id',
		description: 'Id của store',
		type: Number,
	})
	@Note('Lấy danh sách sản phẩm theo store')
	async getProductsByShop(@Param('id') id: number) {
		return await this.productsService.getProductsByStoreId(id);
	}
}
