import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UserUpdateDto {
	@ApiProperty({
		description: 'Họ và tên đầy đủ của người dùng',
	})
	@IsNotEmpty()
	@IsString()
	readonly fullName: string;

	@ApiProperty({
		description: 'Mã tỉnh thành',
		example: '01',
	})
	@IsNotEmpty()
	@IsString()
	@Length(2)
	readonly provinceCode: string;

	@ApiProperty({
		description: 'Mã quận huyện',
		example: '001',
	})
	@IsNotEmpty()
	@IsString()
	@Length(3)
	readonly districtCode: string;

	@ApiProperty({
		description: 'Mã phường xã',
		example: '00001',
	})
	@IsNotEmpty()
	@IsString()
	@Length(5)
	readonly wardCode: string;

	@ApiProperty({
		description: 'Địa chỉ chi tiết',
	})
	@IsNotEmpty()
	@IsString()
	readonly address: string;
}
