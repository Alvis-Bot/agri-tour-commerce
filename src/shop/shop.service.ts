import { Injectable } from '@nestjs/common';
import { ShopCreateDto } from '@/shop/dto/shop-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from '@/common/entities/shop.entity';
import { Repository } from 'typeorm';
import { User } from '@/common/entities/user.entity';
import { ApiException } from '@/exception/api.exception';
import { ErrorMessages } from '@/exception/error.code';
import { Pagination } from '@/common/pagination/pagination.dto';
import { Meta } from '@/common/pagination/meta.dto';
import { PaginationModel } from '@/common/pagination/pagination.model';
import { UsersService } from '@/users/users.service';
import { UserRole } from '@/auth/role.builder';
import { ShippingMethodsService } from '@/shipping-methods/shipping-methods.service';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    private readonly shippingMethodsService: ShippingMethodsService,
    private readonly usersService: UsersService,
  ) {}

  async createShop(dto: ShopCreateDto, myUser: User): Promise<Shop> {
    const myShop = await this.selectOneShopByUserId(myUser.id);
    console.log(myShop);
    if (myShop) {
      throw new ApiException(ErrorMessages.SHOP_ALREADY_EXISTS);
    }
    const createdShop = this.shopRepository.create({
      ...dto,
      user: myUser,
    });
    // cập nhật lại quyền cho user từ USER -> SHOP
    await this.usersService.updateRole(myUser, UserRole.SHOP);
    return await this.shopRepository.save(createdShop);
  }

  async getMyShop(myUser: User): Promise<Shop> {
    const myShop = await this.selectOneShopByUserId(myUser.id);
    if (!myShop) {
      throw new ApiException(ErrorMessages.SHOP_NOT_FOUND);
    }
    return myShop;
  }

  async selectOneShopByUserId(userId: number): Promise<Shop> {
    return await this.shopRepository
      .createQueryBuilder('shop')
      .leftJoinAndSelect('shop.user', 'user')
      .where('user.id = :userId', { userId })
      .getOne();
  }

  async getShopById(id: number): Promise<Shop> {
    const shop = await this.shopRepository.findOne({
      where: { id },
    });
    if (!shop) {
      throw new ApiException(ErrorMessages.SHOP_NOT_FOUND);
    }
    return shop;
  }

  async getShopsPaginate(pagination: Pagination) {
    const queryBuilder = this.shopRepository
      .createQueryBuilder('shop')
      // .leftJoinAndSelect('shop.user', 'user')
      .take(pagination.take)
      .skip(pagination.skip)
      .orderBy('shop.createdAt', 'DESC');

    const itemCount = await this.shopRepository.count();
    const { entities } = await queryBuilder.getRawAndEntities();
    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel(entities, meta);
  }
}
