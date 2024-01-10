import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShippingMethod } from '@/common/entities/shipping-method.entity';
import { Repository } from 'typeorm';
import { ShippingMethodCreateDto } from '@/shipping-methods/dto/shipping-method-create.dto';
import { ApiException } from '@/exception/api.exception';
import { ErrorMessages } from '@/exception/error.code';

@Injectable()
export class ShippingMethodsService {
  constructor(
    @InjectRepository(ShippingMethod)
    private readonly shippingMethodRepository: Repository<ShippingMethod>,
  ) {}

  async selectManyShippingMethods() {
    return await this.shippingMethodRepository.find();
  }

  async createShippingMethod(dto: ShippingMethodCreateDto) {
    const shippingMethod = this.shippingMethodRepository.create({
      ...dto,
    });
    return await this.shippingMethodRepository.save(shippingMethod);
  }

  async getShippingMethodById(id: number) {
    const shippingMethod = await this.shippingMethodRepository.findOne({
      where: { id },
    });
    if (!shippingMethod) {
      throw new ApiException(ErrorMessages.SHIPPING_METHOD_NOT_FOUND);
    }
    return shippingMethod;
  }
}
