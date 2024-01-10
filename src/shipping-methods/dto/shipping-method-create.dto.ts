import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ShippingMethodCreateDto {
  @IsString()
  @ApiProperty()
  name: string; // tên phương thức vận chuyển

  @IsString()
  @ApiProperty()
  description: string; // mô tả phương thức vận chuyển
}
