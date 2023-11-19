import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
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
import { ProductApproveDto } from '@/products/dto/product-approve.dto';
import { ShopService } from '@/shop/shop.service';
import { ProductQueryDto } from '@/products/dto/product-query.dto';
import { Pagination } from '@/common/pagination/pagination.dto';

@Controller(Routers.PRODUCTS)
@ApiTags('APIs for products - APIs sản phẩm')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly shopService: ShopService,
  ) {}

  @Post(':id')
  @ApiParam({
    name: 'id',
    description: 'Id của shop',
    type: Number,
  })
  @Note('Tạo mới sản phẩm')
  @ApiFiles(
    'images',
    10,
    MulterUtils.getConfig(UploadTypesEnum.IMAGES_AND_VIDEOS),
  )
  async createProduct(
    @Param('id') id: number,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() dto: ProductCreateDto,
  ) {
    const shop = await this.shopService.getShopById(id);
    return await this.productsService.createProduct(dto, files, shop);
  }

  @ApiParam({
    name: 'id',
    description: 'Id của sản phẩm',
    type: Number,
  })
  @Patch(':id/approve')
  @Note('Duyệt/Hủy duyệt sản phẩm')
  async approveProduct(
    @Param('id') id: number,
    @Body() dto: ProductApproveDto,
  ) {
    const product = await this.productsService.getProductById(id);
    return await this.productsService.approveProduct(dto, product);
  }

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
    return await this.productsService.getProducts(dto, pagination);
  }

  @Get('shop/:id')
  @ApiParam({
    name: 'id',
    description: 'Id của shop',
    type: Number,
  })
  @Note('Lấy danh sách sản phẩm theo shop')
  async getProductsByShop(@Param('id') id: number) {
    return await this.productsService.getProductsByShop(id);
  }
}
