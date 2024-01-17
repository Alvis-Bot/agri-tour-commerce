import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  IsPositive,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

  
  @ApiProperty({
    description: 'Id của store',
  })
  @IsInt()
  @Min(1)
  @IsPositive()
  storeId: number;

  @ApiPropertyOptional({
    description: 'Ghi chú',
  })
  @IsOptional()
  note?: string;

  @ApiProperty({ type: [OrderDetailCreateDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  orderDetails: OrderDetailCreateDto[];
}
