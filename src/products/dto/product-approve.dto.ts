import { PickType } from '@nestjs/swagger';
import { ProductCreateDto } from '@/products/dto/product-create.dto';

export class ProductApproveDto extends PickType(ProductCreateDto, []) {}
