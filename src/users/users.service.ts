import { Injectable } from '@nestjs/common';
import { User } from '@/common/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserUpdateDto } from '@/users/dto/user-update.dto';
import { RegionsService } from '@/regions/regions.service';
import { Meta } from '@/common/pagination/meta.dto';
import { PaginationModel } from '@/common/pagination/pagination.model';
import { Pagination } from '@/common/pagination/pagination.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly regionsService: RegionsService,
	) {}

	// async updateFcmToken(dto: LoginDto, user: User) {
	// 	const fcmTokens = user.fcmTokens || [];
	// 	if (dto.fcmToken && !fcmTokens.includes(dto.fcmToken)) {
	// 	  fcmTokens.push(dto.fcmToken);
	// 	}
	// 	user.fcmTokens = fcmTokens; // Cập nhật mảng fcmTokens trong đối tượng user
	// 	return await this.userRepository.save(user);
	// }

	async findOneByPhone(phone: string) {
		return await this.userRepository.findOne({
			where: {
				phone,
			},
		});
	}

	async createBaseUser(entity: Partial<User>) {
		const createdUser = this.userRepository.create(entity);
		return await this.userRepository.save(createdUser);
	}

	async updateMyInfo(dto: UserUpdateDto, user: User) {
		const [province, district, ward] = await Promise.all([
			this.regionsService.validateRegion(dto.provinceCode, 'province'),
			this.regionsService.validateRegion(dto.districtCode, 'district'),
			this.regionsService.validateRegion(dto.wardCode, 'ward'),
		]);

		return await this.userRepository.save({
			...user,
			...dto,
			isNew: false,
			province,
			district,
			ward,
		});
	}

	async getMyInfo(user: User) {
		return await this.userRepository.findOne({
			where: {
				id: user.id,
			},
			relations: ['province', 'district', 'ward'],
		});
	}

	async findOneByUid(uid: string) {
		return await this.userRepository.findOne({
			where: {
				uid,
			},
		});
	}

	async findOneByEmail(email: string) {
		return await this.userRepository.findOne({
			where: {
				email,
			},
		});
	}

	async getUsersWithPagination(pagination: Pagination) {
		const queryBuilder = this.userRepository
			.createQueryBuilder('user')
			.take(pagination.take)
			.skip(pagination.skip)
			.leftJoinAndSelect('user.province', 'province')
			.leftJoinAndSelect('user.district', 'district')
			.leftJoinAndSelect('user.ward', 'ward')
			// trừ ADMIN
			// .where('user.roles != :role', { role: UserRole.ADMIN })
			.orderBy('user.createdAt', pagination.order);

		const itemCount = await this.userRepository.count();
		const { entities } = await queryBuilder.getRawAndEntities();
		const meta = new Meta({ itemCount, pagination });
		return new PaginationModel(entities, meta);
	}
}
