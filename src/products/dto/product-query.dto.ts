import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";


export class ProductQueryDto{

  @ApiPropertyOptional()
  @IsOptional()
  categoryId?: number;


}