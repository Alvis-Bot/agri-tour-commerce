import { BusinessType } from '@/common/enums/business-type';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ShopCreateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsPhoneNumber('VN')
  @ApiProperty()
  phone: string;

  @IsEnum(BusinessType)
  @ApiProperty({ enum: BusinessType, default: BusinessType.INDIVIDUAL })
  //loại hình doanh nghiệp
  type: BusinessType;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  //cmnd/cccd
  identity: string;

  @IsOptional()
  @ApiPropertyOptional()
  //mã thuế
  taxCode?: string;
}
