import { Injectable } from "@nestjs/common";
import { LoginDto } from "@/users/dto/login.dto";
import { User } from "@/common/entities/user";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserUpdateDto } from "@/users/dto/user-update.dto";
import { RegionsService } from "@/regions/regions.service";
import { ApiException } from "@/exception/api.exception";
import { ErrorMessages } from "@/exception/error.code";
import { UserRole } from "@/auth/role.builder";

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly regionsService: RegionsService,
  ) {
  }

  async updateFcmToken(dto: LoginDto, user: User) {
    // const fcmTokens = user.fcmTokens || [];
    // if (dto.fcmToken && !fcmTokens.includes(dto.fcmToken)) {
    //   fcmTokens.push(dto.fcmToken);
    // }
    // user.fcmTokens = fcmTokens; // Cập nhật mảng fcmTokens trong đối tượng user
    return await this.userRepository.save(user);

  }

  async findOneByPhone(phone: string) {
    return await this.userRepository.findOne({
      where: {
        phone
      }
    });
  }

  async createBaseUser(entity: Partial<User>) {
    const createdUser = this.userRepository.create(entity);
    return await this.userRepository.save(createdUser);
  }

  async updateAccount(dto: UserUpdateDto, user: User) {
    const province = await this.regionsService.getProvinceByCode(dto.provinceCode);
    if (!province) throw new ApiException(ErrorMessages.PROVINCE_NOT_FOUND)
    const district = await this.regionsService.getDistrictByCode(dto.districtCode);
    if (!district) throw new ApiException(ErrorMessages.DISTRICT_NOT_FOUND)
    const ward = await this.regionsService.getWardByCode(dto.wardCode);
    if (!ward) throw new ApiException(ErrorMessages.WARD_NOT_FOUND)

    return await this.userRepository.save({
      ...user,
      ...dto,
      isNew: false,
      province,
      district,
      ward,
    });
  }

  async getAccount(user: User) {
    return await this.userRepository.findOne({
      where: {
        id: user.id,
      },
      relations: ['province', 'district', 'ward'],
    });
  }

  async updateRole(user: User, role: UserRole) {
    return await this.userRepository.save({
      ...user,
      roles: role,
    });

  }
}
