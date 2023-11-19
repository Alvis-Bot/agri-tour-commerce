import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray } from 'class-validator';

export class DtestDtone {
  @ApiProperty({ type: [String] })
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  @IsArray()
  tet: string[];
}
