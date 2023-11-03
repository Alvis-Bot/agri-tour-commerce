import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { Note } from "@/common/decorator/note.decorator";
import { FirebaseAuthGuard } from "@/auth/guard/firebase-auth.guard";
import { ACGuard, UseRoles } from "nest-access-control";
import { AuthUser } from "@/common/decorator/user.decorator";
import { User } from "@/common/entities/user.entity";
import { ProductRatingService } from "@/product-rating/product-rating.service";
import { ProductRatingCreateDto } from "@/product-rating/dto/product-rating-create.dto";

@Controller('product-rating')
@UseGuards(FirebaseAuthGuard , ACGuard)
export class ProductRatingController {

  constructor(
    private readonly productRatingService: ProductRatingService,
  ) {}

  @Post()
  @UseRoles({
    resource: "product-rating", // 👈 resource
    action: "create", // 👈 action (e.g., create:own, update:any, read:own, delete:own)
    possession: "any", // 👈 possession (e.g., own, any) // là bất kỳ ai cũng có thể tạo mới
  }) // 👈 resource
  @Note('Thêm mới đánh giá sản phẩm')
  async createProductRating(
    @Body() dto: ProductRatingCreateDto,
    @AuthUser() user: User,
  ) {
    return await this.productRatingService.createProductRating(user ,dto);
  }
}
