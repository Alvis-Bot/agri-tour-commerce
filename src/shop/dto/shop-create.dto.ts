import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BusinessType } from '@/common/enums/business-type';

export class ShopCreateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string; // tên shop

  // địa chỉ shop là mảng các string
  @IsNotEmpty()
  @IsString({ each: true })
  @ApiProperty()
  pickupAddress: string[]; // địa chỉ shop

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  phone: string;

  // step 2
  @ApiProperty()
  // phuong thuc van chuyen
  shippingMethodIds: number[];

  //step 3
  @ApiProperty({
    description: 'Loại hình doanh nghiệp',
    enum: BusinessType,
  })
  @IsEnum(BusinessType)
  readonly type: BusinessType;

  @ApiProperty()
  companyName: string;

  @ApiProperty({
    description: 'Mã tỉnh thành',
    example: '01',
  })
  readonly provinceCode: string;

  @ApiProperty({
    description: 'Mã quận huyện',
    example: '001',
  })
  readonly districtCode: string;

  @ApiProperty({
    description: 'Mã phường xã',
    example: '00001',
  })
  readonly wardCode: string;

  @ApiProperty()
  readonly address: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'dang ky kinh doanh',
  })
  businessLicense: Express.Multer.File;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'cccd',
  })
  identity: Express.Multer.File;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'avatar + cccd ',
  })
  avatar: Express.Multer.File;
}
