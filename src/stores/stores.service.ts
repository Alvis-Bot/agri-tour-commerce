import { Inject, Injectable } from '@nestjs/common';
import { CombinedDto, LocationDto } from '@/stores/dto/store-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from '@/common/entities/store/store.entity';
import { Repository } from 'typeorm';
import { User } from '@/common/entities/user.entity';
import { ApiException } from '@/exception/api.exception';
import { ErrorMessages } from '@/exception/error.code';
import { Pagination } from '@/common/pagination/pagination.dto';
import { Meta } from '@/common/pagination/meta.dto';
import { PaginationModel } from '@/common/pagination/pagination.model';
import { Service } from '@/common/enums/service';
import { IDeliveryMethodService } from '@/delivery-methods/service/delivery-methods';
import { DeliveryOption } from '@/common/entities/store/delivery-option.entity';
import { RegionsService } from '@/regions/regions.service';
import {
	Location,
	LocationType,
} from '@/common/entities/store/location.entity';
import { Identity } from '@/common/entities/store/identity.entity';

@Injectable()
export class StoresService {
	constructor(
		@InjectRepository(Store)
		private readonly storeRepository: Repository<Store>,
		@Inject(Service.TRANSPORT_METHODS_SERVICE)
		private readonly deliveryMethodService: IDeliveryMethodService,
		@InjectRepository(DeliveryOption)
		private readonly deliveryOptionEntityRepository: Repository<DeliveryOption>,
		private readonly regionsService: RegionsService,
		@InjectRepository(Location)
		private readonly locationEntityRepository: Repository<Location>,
		@InjectRepository(Identity)
		private readonly identityRepository: Repository<Identity>,
	) {}

	async selectOneStoreFetchByUserId(userId: number): Promise<Store> {
		return await this.storeRepository
			.createQueryBuilder('store')
			.leftJoinAndSelect('store.user', 'user')
			.leftJoinAndSelect('store.deliveryOptions', 'deliveryOptions')
			.leftJoinAndSelect('deliveryOptions.deliveryMethod', 'deliveryMethod')
			.leftJoinAndSelect('store.locations', 'locations')
			.leftJoinAndSelect('locations.province', 'province')
			.leftJoinAndSelect('locations.district', 'district')
			.leftJoinAndSelect('locations.ward', 'ward')
			.leftJoinAndSelect('store.identity', 'identity')
			.where('user.id = :userId', { userId })
			.getOne();
	}

	async selectOneStoreyUserId(userId: number): Promise<Store> {
		return await this.storeRepository.findOne({
			where: { user: { id: userId } },
		});
	}

	async selectOneStoreById(id: number): Promise<Store> {
		return await this.storeRepository
			.createQueryBuilder('store')
			.leftJoinAndSelect('store.user', 'user')
			.leftJoinAndSelect('store.locations', 'locations')
			.leftJoinAndSelect('locations.province', 'province')
			.leftJoinAndSelect('locations.district', 'district')
			.leftJoinAndSelect('locations.ward', 'ward')
			.leftJoinAndSelect('store.identity', 'identity')
			.leftJoinAndSelect('store.deliveryOptions', 'deliveryOptions')
			.leftJoinAndSelect('deliveryOptions.deliveryMethod', 'deliveryMethod')
			.where('store.id = :id', { id })
			.getOne();
	}

	async checkAndCreateLocation(
		location: LocationDto,
		type?: LocationType,
	): Promise<Location> {
		const province = await this.regionsService.getProvinceByCode(
			location.provinceCode,
		);
		if (!province) throw new ApiException(ErrorMessages.PROVINCE_NOT_FOUND);

		const district = await this.regionsService.getDistrictByCode(
			location.districtCode,
		);
		if (!district) throw new ApiException(ErrorMessages.DISTRICT_NOT_FOUND);

		const ward = await this.regionsService.getWardByCode(location.wardCode);
		if (!ward) throw new ApiException(ErrorMessages.WARD_NOT_FOUND);

		return this.locationEntityRepository.create({
			...location,
			province,
			district,
			ward,
			type: type || LocationType.COLLECTION,
		});
	}

	async createShop(
		dto: CombinedDto,
		myUser: User,
		businessLicense: Express.Multer.File[],
		identityImage: Express.Multer.File[],
		identityImageHold: Express.Multer.File[],
	): Promise<Store> {
		// kiểm tra store đã tồn tại chưa
		const store = await this.selectOneStoreyUserId(myUser.id);
		if (store) throw new ApiException(ErrorMessages.STORE_ALREADY_EXISTS);

		// tạo phuong thức vận chuyển cho shop
		const deliveryOptionsCreated = await Promise.all(
			dto.deliveryMethods.map(async (value) => {
				const deliveryMethod =
					await this.deliveryMethodService.selectDeliveryMethodById(value.id);
				if (!deliveryMethod)
					throw new ApiException(ErrorMessages.DELIVERY_METHOD_NOT_FOUND);
				return this.deliveryOptionEntityRepository.create({
					deliveryMethod,
					isLocked: value.isLocked,
				});
			}),
		);
		const deliveryOptions = await this.deliveryOptionEntityRepository.save(
			deliveryOptionsCreated,
		);

		// tạo địa chỉ cho shop
		const locationsCreated = await Promise.all(
			dto.locations.map(async (location) => {
				return await this.checkAndCreateLocation(location);
			}),
		);

		const locations = await this.locationEntityRepository.save(
			locationsCreated,
		);

		// tạo thông tin chứng minh cho shop
		const identityCreated = this.identityRepository.create({
			...dto,
			identityImage: identityImage[0].filename,
			identityImageHold: identityImageHold[0].filename,
		});

		const identity = await this.identityRepository.save(identityCreated);

		// tạo shop
		const storeCreated = this.storeRepository.create({
			...dto,
			user: myUser,
			locations,
			identity,
			deliveryOptions,
			businessLicense: businessLicense[0].filename,
		});

		return await this.storeRepository.save(storeCreated);
	}

	async getStoreByUser(user: User): Promise<Store> {
		const store = await this.selectOneStoreFetchByUserId(user.id);
		if (!store) {
			throw new ApiException(ErrorMessages.STORE_NOT_FOUND);
		}
		return store;
	}

	async getShopsPaginate(pagination: Pagination) {
		const queryBuilder = this.storeRepository
			.createQueryBuilder('store')
			.leftJoinAndSelect('store.user', 'user')
			.leftJoinAndSelect('store.deliveryOptions', 'deliveryOptions')
			.leftJoinAndSelect('deliveryOptions.deliveryMethod', 'deliveryMethod')
			.leftJoinAndSelect('store.locations', 'locations')
			.leftJoinAndSelect('locations.province', 'province')
			.leftJoinAndSelect('locations.district', 'district')
			.leftJoinAndSelect('locations.ward', 'ward')
			.leftJoinAndSelect('store.identity', 'identity')
			.take(pagination.take)
			.skip(pagination.skip)
			.orderBy('store.createdAt', 'DESC');

		const itemCount = await this.storeRepository.count();
		const { entities } = await queryBuilder.getRawAndEntities();
		const meta = new Meta({ itemCount, pagination });
		return new PaginationModel(entities, meta);
	}

	async selectDeliveryOptionsByStoreId(storeId: number) {
		return await this.deliveryOptionEntityRepository
			.createQueryBuilder('deliveryOption')
			.leftJoinAndSelect('deliveryOption.deliveryMethod', 'deliveryMethod')
			.where('deliveryOption.store.id = :storeId', { storeId })
			.getMany();
	}

	// async updateShopStepOne(dto: StoreUpdateStepOneDto, myUser: User) {
	// 	const store = await this.selectOneStoreFetchByUserId(myUser.id);
	// 	if (!store) throw new ApiException(ErrorMessages.STORE_NOT_FOUND);
	//
	// 	// // tạo phuong thức vận chuyển cho shop
	// 	// const deliveryMethods =
	// 	// 	await this.deliveryMethodService.getDeliveryMethods();
	// 	// // nêu deliveryOptions có dữ liệu thì update , không thì tạo mới
	// 	//
	// 	// if (store.deliveryOptions.length > 0) {
	// 	// 	// cập nhật lại deliveryOptions
	// 	// 	const deliveryOptions = await this.selectDeliveryOptionsByStoreId(
	// 	// 		store.id,
	// 	// 	);
	// 	// 	deliveryOptions.forEach((deliveryOption) => {
	// 	// 		this.deliveryOptionEntityRepository.update(
	// 	// 			{ id: deliveryOption.id },
	// 	// 			{
	// 	// 				isLocked: dto.deliveryMethodIds.includes(
	// 	// 					deliveryOption.deliveryMethod.id,
	// 	// 				),
	// 	// 			},
	// 	// 		);
	// 	// 	});
	// 	// } else {
	// 	// 	const deliveryOptions = deliveryMethods.map((deliveryMethod) => {
	// 	// 		return this.deliveryOptionEntityRepository.create({
	// 	// 			store,
	// 	// 			deliveryMethod: deliveryMethod,
	// 	// 			isLocked: dto.deliveryMethodIds.includes(deliveryMethod.id),
	// 	// 		});
	// 	// 	});
	// 	// 	await this.deliveryOptionEntityRepository.save(deliveryOptions);
	// 	// 	await this.storeRepository.save({
	// 	// 		...store,
	// 	// 		deliveryOptions,
	// 	// 		step: 2,
	// 	// 	});
	// 	// }
	//
	// 	return await this.getStoreByUser(myUser);
	// }

	// async getStep(myUser: User) {
	// 	return await this.storeRepository
	// 		.createQueryBuilder('store')
	// 		.leftJoinAndSelect('store.user', 'user')
	// 		.select('store.step')
	// 		.where('store.user.id = :userId', { userId: myUser.id })
	// 		.getOne();
	// }

	// async updateShopStepTwo(
	// 	dto: StoreUpdateStepTwoDto,
	// 	myUser: User,
	// 	businessLicense: Express.Multer.File,
	// ) {
	// 	const store = await this.selectOneStoreFetchByUserId(myUser.id);
	// 	if (!store) throw new ApiException(ErrorMessages.STORE_NOT_FOUND);
	//
	// 	const createdLocation = await this.checkAndCreateLocation(
	// 		{
	// 			address: dto.address,
	// 			provinceCode: dto.provinceCode,
	// 			districtCode: dto.districtCode,
	// 			wardCode: dto.wardCode,
	// 		},
	// 		LocationType.STORE,
	// 	);
	// 	const isLocationExists = await CodeUtil.isLocationExists(
	// 		store?.locations,
	// 		createdLocation.province.code,
	// 		createdLocation.district.code,
	// 		createdLocation.ward.code,
	// 		dto.address,
	// 	);
	//
	// 	businessLicense && MulterUtils.deleteFile(store.businessLicense);
	//
	// 	const storeLocations = isLocationExists
	// 		? store.locations
	// 		: [
	// 				...store.locations,
	// 				await this.locationEntityRepository.save(createdLocation),
	// 		  ];
	// 	// cập nhật thông tin store
	// 	await this.storeRepository.save({
	// 		...store,
	// 		...dto,
	// 		step: 3,
	// 		locations: storeLocations,
	// 		businessLicense: businessLicense.filename,
	// 	});
	// 	return await this.getStoreByUser(myUser);
	// }

	// async updateShopStepThree(
	// 	dto: StoreUpdateStepThreeDto,
	// 	myUser: User,
	// 	files: {
	// 		identityImage: Express.Multer.File[];
	// 		identityImageHold: Express.Multer.File[];
	// 	},
	// ) {
	// 	// const store = await this.selectOneStoreFetchByUserId(myUser.id);
	// 	// if (!store) {
	// 	// 	// vì multer đã lưu file vào thư mục nên phải xóa đi
	// 	// 	throw new ApiException(ErrorMessages.STORE_NOT_FOUND);
	// 	// }
	// 	//
	// 	// // nếu store.identity không có thì tao và save , có thì update dữ liệu
	// 	// if (!store.identity) {
	// 	// 	const identityCreated = this.identityRepository.create({
	// 	// 		...dto,
	// 	// 		identityImage: files.identityImage[0].filename,
	// 	// 		identityImageHold: files.identityImageHold[0].filename,
	// 	// 	});
	// 	// 	const identity = await this.identityRepository.save(identityCreated);
	// 	// 	await this.storeRepository.save({
	// 	// 		...store,
	// 	// 		step: 4,
	// 	// 		identity,
	// 	// 	});
	// 	// } else {
	// 	// 	// vì xoá file cũ
	// 	// 	files.identityImage &&
	// 	// 		MulterUtils.deleteFile(store.identity.identityImage);
	// 	// 	files.identityImageHold &&
	// 	// 		MulterUtils.deleteFile(store.identity.identityImageHold);
	// 	// 	// update dữ liệu
	// 	// 	await this.identityRepository
	// 	// 		.createQueryBuilder()
	// 	// 		.update()
	// 	// 		.set({
	// 	// 			...dto,
	// 	// 			identityImage:
	// 	// 				files.identityImage?.[0]?.filename || store.identity.identityImage,
	// 	// 			identityImageHold:
	// 	// 				files.identityImageHold?.[0]?.filename ||
	// 	// 				store.identity.identityImageHold,
	// 	// 		})
	// 	// 		.where('id = :id', { id: store.identity.id })
	// 	// 		.execute();
	// 	// }
	// 	// return await this.getStoreByUser(myUser);
	// }
}
