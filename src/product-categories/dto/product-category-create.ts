import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductCategoryCreate {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty({
    description: 'Ảnh đại diện',
    type: 'string',
    format: 'binary',
  })
  image: Express.Multer.File;
}
