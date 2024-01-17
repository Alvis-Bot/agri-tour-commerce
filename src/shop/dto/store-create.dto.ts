import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BusinessType } from '@/common/enums/business-type';
import { Transform } from 'class-transformer';
import { IdentityType } from '@/common/entities/store/identity.entity';

export class LocationDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Mã tỉnh thành',
    default: '01',
  })
  provinceCode: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Mã quận huyện',
    default: '001',
  })
  districtCode: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Mã phường xã',
    default: '00001',
  })
  wardCode: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Địa chỉ',
    default: 'Số 1, Nguyễn Trãi, Thanh Xuân, Hà Nội',
  })
  address: string;
}

export class StoreCreateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string; // tên store

  @ApiProperty({
    description: 'Địa chỉ',
    type: LocationDto,
    isArray: true,
  })
  @IsNotEmpty()
  readonly locations: LocationDto[];

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  phone: string;
}

export class StoreUpdateStepOneDto {
  // phuong thuc van chuyen
  @IsNotEmpty()
  @ApiProperty({
    description:
      'Mảng id của phương thức vận chuyển (chỉ cần truyền lên phương thức vận chuyển muốn bật)',
    type: [Number],
    default: [1, 2],
    isArray: true,
  })
  readonly deliveryMethodIds: number[];
}

export class StoreUpdateStepTwoDto extends LocationDto {
  // loại hình doanh nghiệp
  @IsNotEmpty()
  @ApiProperty({
    description: 'Loại hình doanh nghiệp',
    default: BusinessType.INDIVIDUAL,
  })
  readonly type: BusinessType;

  //mã thuế
  @IsNotEmpty()
  @ApiProperty({
    description: 'Mã thuế',
    default: '123456789',
  })
  readonly taxCode: string;

  // tên cong ty
  @IsNotEmpty()
  @ApiProperty({
    description: 'Tên công ty',
    default: 'Công ty TNHH ABC',
  })
  readonly companyName: string;

  // mail hoá đơn điện tử
  @IsNotEmpty()
  @ApiProperty()
  @Transform(({ value }) => value.split(',').map((item: string) => item.trim()))
  readonly emailInvoice: string[];

  //mã giấy phép kinh doanh
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  readonly businessLicense: Express.Multer.File;
}


export class StoreUpdateStepThreeDto{

  //hình thức đinh danh
  @IsNotEmpty()
  @ApiProperty({
    description: 'Hình thức định danh',
    default: IdentityType.CMND,
  })
  @Transform(({ value }) => value.toUpperCase())
  readonly type: IdentityType;

  //mã định danh
  @IsNotEmpty()
  @ApiProperty({
    description: 'Mã định danh',
    default: '123456789',
  })
  readonly number: string;


  //họ và tên
  @IsNotEmpty()
  @ApiProperty({
    description: 'Họ và tên',
    default: 'Nguyễn Văn A',
  })
  readonly fullName: string;

  //ảnh định danh
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  readonly identityImage: Express.Multer.File;

  //ảnh cầm định danh
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  readonly identityImageHold: Express.Multer.File;


}
