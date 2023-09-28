import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class ProductCategoryCreate{
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Ảnh đại diện',
    type: 'string',
    format: 'binary'
  })
  @IsNotEmpty()
  image : string;
}