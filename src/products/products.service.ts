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
import { Pagination } from "@/common/pagination/pagination.dto";
import { Meta } from "@/common/pagination/meta.dto";
import { PaginationModel } from "@/common/pagination/pagination.model";
import { ApproveStatus } from "@/common/enums/approve-status";

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

  async getProducts(dto: ProductQueryDto, pagination: Pagination) {
    // add field sum rating
    const queryBuilder = this.productRepository.createQueryBuilder("product")
      .leftJoinAndSelect("product.ratings", "ratings")
      .leftJoinAndSelect("product.category", "category")
      .select('ROUND(AVG(ratings.rating),2)', "rating")
      .addSelect("product.id", "id")
      .addSelect("product.name", "name")
      .addSelect("product.price", "price")
      .addSelect("product.salePrice", "salePrice")
      .addSelect("product.saleStartDate", "saleStartDate")
      .addSelect("product.saleEndDate", "saleEndDate")
      .addSelect("product.quantity", "quantity")
      .addSelect("product.images", "images")
      .addSelect("product.inventory", "inventory")
      .addSelect("product.status", "status")
      .addSelect("product.approveStatus", "approveStatus")
      .addSelect("product.description", "description")
      .addSelect("product.createdAt", "createdAt")
      .addSelect("product.updatedAt", "updatedAt")
      .groupBy("product.id")
      .where('category.id = :categoryId', { categoryId: dto.categoryId })
      // .andWhere('product.approveStatus = :approveStatus', { approveStatus: ApproveStatus.APPROVED })
      .skip(pagination.skip)
      .take(pagination.take)
      // .where('product.category.id = :categoryId', { categoryId: dto.categoryId })
      // column "product.id" must appear in the GROUP BY clause or be used in an aggregate functio

    const itemCount = await queryBuilder.getCount();
    const raw = await queryBuilder.getRawMany();
    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel(raw, meta);



  }

  async getProductsByShop(id: number) {
    return await this.productRepository.find({
      where: {
        shop: { id }
      }
    });
  }
}
