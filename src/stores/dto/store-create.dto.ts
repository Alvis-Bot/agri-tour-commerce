import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsString,
	ValidateNested,
} from 'class-validator';
import {
	ApiProperty,
	ApiPropertyOptional,
	IntersectionType,
} from '@nestjs/swagger';
import { BusinessType } from '@/common/enums/business-type';
import { Transform, Type } from 'class-transformer';
import { IdentityType } from '@/common/entities/store/identity.entity';
import { LocationType } from '@/common/entities/store/location.entity';

class LocationDto {
	provinceCode: string;
	districtCode: string;
	wardCode: string;
	address: string;
	type: LocationType;
}

class DeliveryMethodDto {
	id: number;
	isLocked: boolean;
}

class StoreCreateDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({ description: 'Tên store' })
	name: string;

	//array multipart/form-data
	@ValidateNested()
	@Type(() => LocationDto)
	@Transform(({ value }) => JSON.parse(value))
	@ApiProperty({
		type: [LocationDto],
		default: [
			{
				provinceCode: '01',
				districtCode: '001',
				wardCode: '00001',
				type: LocationType.COLLECTION,
				address: 'Số 1, đường 1, phường 1, quận 1, thành phố 1',
			},
			{
				provinceCode: '01',
				districtCode: '001',
				wardCode: '00001',
				type: LocationType.STORE,
				address: 'Số 2, đường 1, phường 1, quận 1, thành phố 1',
			},
			{
				provinceCode: '01',
				districtCode: '001',
				wardCode: '00001',
				type: LocationType.BUSINESS,
				address: 'Số 3, đường 1, phường 1, quận 1, thành phố 1',
			},
		],
	})
	readonly locations: LocationDto[];

	@IsEmail()
	@ApiProperty({ description: 'Email' })
	email: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({ description: 'Số điện thoại' })
	phone: string;
}

class StoreUpdateStepOneDto {
	@ValidateNested()
	@Type(() => DeliveryMethodDto)
	@Transform(({ value }) => JSON.parse(value))
	@ApiProperty({
		type: [DeliveryMethodDto],
		default: [
			{
				id: 1,
				isLocked: false,
			},
			{
				id: 2,
				isLocked: true,
			},
		],
	})
	readonly deliveryMethods: DeliveryMethodDto[];
}

class StoreUpdateStepTwoDto extends LocationDto {
	@IsNotEmpty()
	@ApiProperty({
		description: 'Loại hình doanh nghiệp',
		enum: BusinessType,
		default: BusinessType.INDIVIDUAL,
	})
	readonly businessType: BusinessType;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({ description: 'Mã thuế', default: '123456789' })
	readonly taxCode: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({ description: 'Tên công ty', default: 'Công ty TNHH ABC' })
	readonly companyName: string;

	@ApiProperty({ description: 'Mail hoá đơn điện tử' })
	@Transform(({ value }) => value.split(',').map((item: string) => item.trim()))
	readonly emailInvoice: string[];

	@ApiPropertyOptional({
		type: 'string',
		format: 'binary',
		description: 'Mã giấy phép kinh doanh',
	})
	readonly businessLicense: Express.Multer.File;
}

class StoreUpdateStepThreeDto {
	@IsNotEmpty()
	@IsEnum(IdentityType)
	@ApiProperty({
		enum: IdentityType,
		description: 'Hình thức định danh',
		default: IdentityType.CMND,
	})
	readonly identityType: IdentityType;

	@IsNotEmpty()
	@ApiProperty({ description: 'Mã định danh', default: '123456789' })
	readonly number: string;

	@IsNotEmpty()
	@ApiProperty({ description: 'Họ và tên', default: 'Nguyễn Văn A' })
	readonly fullName: string;

	@ApiProperty({
		type: 'string',
		format: 'binary',
		description: 'Ảnh định danh',
	})
	readonly identityImage: Express.Multer.File;

	@ApiProperty({
		type: 'string',
		format: 'binary',
		description: 'Ảnh cầm định danh',
	})
	readonly identityImageHold: Express.Multer.File;
}

class CombinedDto extends IntersectionType(
	StoreCreateDto,
	StoreUpdateStepOneDto,
	StoreUpdateStepTwoDto,
	StoreUpdateStepThreeDto,
) {}

export {
	LocationDto,
	DeliveryMethodDto,
	StoreCreateDto,
	StoreUpdateStepOneDto,
	StoreUpdateStepTwoDto,
	StoreUpdateStepThreeDto,
	CombinedDto,
};
