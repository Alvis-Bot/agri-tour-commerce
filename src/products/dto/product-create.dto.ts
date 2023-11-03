import { IsString, IsNumber, IsBoolean, IsArray, IsDate, Max, IsEnum } from "class-validator";
import { Transform, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { ApproveStatus } from "@/common/enums/approve-status";

export class ProductCreateDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsNumber()
  @ApiProperty()
  salePrice: number;

  @ApiProperty({
    description : 'Ngày bắt đầu khuyến mãi',
    default: new Date(),
    type: Date
  })
 @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  saleStartDate: Date;

  @ApiProperty({
    type: Date,
    default: new Date(),
    description : 'Ngày kết thúc khuyến mãi',
  })
  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  saleEndDate: Date;

  @IsNumber()
  @ApiProperty()
  quantity: number;

  @ApiProperty({
    description: 'Ảnh đại diện của sản phẩm',
    type: 'string',
    format: 'binary',
    isArray: true, // Indicate that it's an array
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  images: Express.Multer.File[];

  @IsNumber()
  @ApiProperty()
  inventory: number;

  @IsBoolean()
  @ApiProperty({
    default: true,
    description : 'Trạng thái sản phẩm (true : đang bán , false : ngừng bán)'
  })
  status: boolean;

  @IsEnum(ApproveStatus)
  @ApiProperty({
    description : 'Trạng thái duyệt sản phẩm',
    enum: ApproveStatus,
    default: ApproveStatus.PENDING
  })
  approveStatus: ApproveStatus;

  @IsString()
  @ApiProperty()
  description: string;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description : 'id của danh mục sản phẩm'
  })
  categoryId: number;
}
