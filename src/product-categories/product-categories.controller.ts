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
import { ShopService } from '@/shop/shop.service';
import { FirebaseAuthGuard } from '@/auth/guard/firebase-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';

@Controller('product-categories')
@ApiTags('APIs for product categories - API danh mục sản phẩm')
@UseGuards(FirebaseAuthGuard, ACGuard)
export class ProductCategoriesController {
  constructor(
    private readonly productCategoriesService: ProductCategoriesService,
    private readonly shopService: ShopService,
  ) {}

  @Post()
  @UseRoles({
    resource: 'product-categories', // 👈 resource
    action: 'create', // 👈 action (e.g., create:own, update:any, read:own, delete:own)
    possession: 'own', // 👈 possession (e.g., own, any) // own : chỉ tác động vào danh mục sản phẩm của chính mình
  })
  @Note('Tạo mới danh mục sản phẩm')
  @ApiFile('image', MulterUtils.getConfig(UploadTypesEnum.IMAGES))
  async create(
    @Body() dto: ProductCategoryCreate,
    @UploadedFile() image: Express.Multer.File,
  ) {
    console.log(dto);
    return await this.productCategoriesService.createProductCategory(
      image,
      dto,
    );
  }

  @Get()
  @UseRoles({
    resource: 'product-categories', // 👈 resource
    action: 'read', // 👈 action (e.g., create:own, update:any, read:own, delete:own)
    possession: 'own', // 👈 possession (e.g., own, any) // own : chỉ tác động vào danh mục sản phẩm của chính mình
  })
  @Note('Lấy danh sách danh mục sản phẩm theo shop')
  async getProductCategories() {
    return await this.productCategoriesService.getProductCategories();
  }

  @Delete(':id')
  @UseRoles({
    resource: 'product-categories', // 👈 resource
    action: 'delete', // 👈 action (e.g., create:own, update:any, read:own, delete:own)
    possession: 'own', // 👈 possession (e.g., own, any) // own : chỉ tác động vào danh mục sản phẩm của chính mình
  })
  @Note('Xóa danh mục sản phẩm')
  async deleteProductCategories(@Param('id') id: number) {
    return await this.productCategoriesService.deleteProductCategories(id);
  }
}
