import { Injectable } from "@nestjs/common";
import { Product } from "@/common/entities/product.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductCreateDto } from "@/products/dto/product-create.dto";
import { ProductCategoriesService } from "@/product-categories/product-categories.service";
import { ProductApproveDto } from "@/products/dto/product-approve.dto";
import { ApiException } from "@/exception/api.exception";
import { ErrorMessages } from "@/exception/error.code";
import { Shop } from "@/common/entities/shop.entity";
import { ProductQueryDto } from "@/products/dto/product-query.dto";

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly productCategoriesService: ProductCategoriesService
  ) {
  }


  async createProduct(dto: ProductCreateDto, files: Express.Multer.File[], shop: Shop) {
    const category = await this.productCategoriesService.getProductCategoryById(dto.categoryId);
    const product = this.productRepository.create({
      ...dto,
      images: files.map(file => file.filename),
      category: category,
      shop: shop
    });
    return await this.productRepository.save(product);
  }

  async approveProduct(dto: ProductApproveDto, product: Product) {
    return await this.productRepository.save({
      ...product,
      ...dto
    });
  }

  async getProductById(id: number) {
    const product = await this.productRepository.findOne({
      where: { id }
    });
    if (!product) {
      throw new ApiException(ErrorMessages.PRODUCT_NOT_FOUND);
    }
    return product;
  }

  async getProducts(dto: ProductQueryDto) {
    return await this.productRepository.find({
      where : {
        ...(dto.categoryId && { category: { id: dto.categoryId } }),
      },
      relations: ["category"]
    });
  }

  async getProductsByShop(id: number) {
    return await this.productRepository.find({
      where: {
        shop: { id }
      }
    });
  }
}
