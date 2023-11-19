import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsPositive,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDetailCreateDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  @IsPositive()
  productId: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @IsPositive()
  quantity: number;
}

export class OrderCreateDto {
  @ApiProperty({ type: [OrderDetailCreateDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  orderDetails: OrderDetailCreateDto[];
}
