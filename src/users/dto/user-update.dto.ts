import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class UserUpdateDto {

  @ApiProperty()
  @IsNotEmpty()
  readonly fullName: string;

  @ApiProperty({
    description: 'Mã tỉnh thành',
    example: '01',
  })
  @IsNotEmpty()
  readonly provinceCode: string;

  @ApiProperty({
    description: 'Mã quận huyện',
    example: '001',
  })
  @IsNotEmpty()
  readonly districtCode: string;

  @ApiProperty({
    description: 'Mã phường xã',
    example: '00001',
  })
  @IsNotEmpty()
  readonly wardCode: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly address: string;

}