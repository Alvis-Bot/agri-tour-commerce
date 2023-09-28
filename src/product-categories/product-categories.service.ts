import { Injectable } from "@nestjs/common";
import { ProductCategoryCreate } from "@/product-categories/dto/product-category-create";
import { ProductCategory } from "@/common/entities/product-category.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as fs from "fs";
import { MulterUtils } from "@/common/utils/multer.utils";
import { ApiException } from "@/exception/api.exception";
import { ErrorMessages } from "@/exception/error.code";
import { Shop } from "@/common/entities/shop.entity";

@Injectable()
export class ProductCategoriesService {

  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>
  ) {
  }

  async createProductCategory(file: Express.Multer.File, dto: ProductCategoryCreate, myShop: Shop) {
    const productCategory = this.productCategoryRepository.create({
      ...dto,
      image: file.filename,
      shop: myShop
    });
    return await this.productCategoryRepository.save(productCategory);
  }

  async getProductCategories(myShop: Shop) {
    return await this.productCategoryRepository.find({
      where: {
        shop: myShop
      }
    });
  }

  async deleteProductCategories(id: number) {
    const productCategory = await this.productCategoryRepository.findOne({
      where: {
        id
      }
    });
    if (!productCategory) {
      throw new ApiException(ErrorMessages.CATEGORY_PRODUCT_NOT_FOUND);
    }
    // xoá ảnh
    MulterUtils.deleteFile(productCategory.image);
    // xoá danh mục
    await this.productCategoryRepository.delete(id);

  }
}
