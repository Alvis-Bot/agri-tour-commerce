import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";


export class LoginDto{
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  fcmToken?: string;

}