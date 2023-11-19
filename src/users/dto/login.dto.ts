import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  fcmToken?: string;
}
