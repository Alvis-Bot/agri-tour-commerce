import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class ProductRatingCreateDto{
  @IsNotEmpty()
  @ApiProperty()
  productId: number;

  @IsNotEmpty()
  @ApiProperty()
  rating: number;

}