import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Note } from '@/common/decorator/note.decorator';
import { FirebaseAuthGuard } from '@/auth/guard/firebase-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import { AuthUser } from '@/common/decorator/user.decorator';
import { User } from '@/common/entities/user.entity';
import { ProductRatingService } from '@/product-rating/product-rating.service';
import { ProductRatingCreateDto } from '@/product-rating/dto/product-rating-create.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('product-rating')
@UseGuards(FirebaseAuthGuard, ACGuard)
@ApiTags('APIs for product rating - API đánh giá sản phẩm')
export class ProductRatingController {
  constructor(private readonly productRatingService: ProductRatingService) {}

  @Post()
  @UseRoles({
    resource: 'product-rating', // 👈 resource
    action: 'create', // 👈 action (e.g., create:own, update:any, read:own, delete:own)
  }) // 👈 resource
  @Note('Thêm mới đánh giá sản phẩm')
  async createProductRating(
    @Body() dto: ProductRatingCreateDto,
    @AuthUser() user: User,
  ) {
    return await this.productRatingService.createProductRating(user, dto);
  }
}
