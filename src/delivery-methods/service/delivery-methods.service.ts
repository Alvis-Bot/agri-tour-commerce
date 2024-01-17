import { Injectable, OnModuleInit } from '@nestjs/common';
import { IDeliveryMethodService } from '@/delivery-methods/service/delivery-methods';
import { DeliveryMethod } from '@/common/entities/store/delivery-method.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TRANSPORT_METHOD_DATA } from '@/common/data/transport-method';

@Injectable()
export class DeliveryMethodsService
  implements IDeliveryMethodService, OnModuleInit
{
  constructor(
    @InjectRepository(DeliveryMethod)
    private readonly transportMethodRepository: Repository<DeliveryMethod>,
  ) {}

  async getDeliveryMethods(): Promise<DeliveryMethod[]> {
    return this.transportMethodRepository.find();
  }

  async onModuleInit(): Promise<void> {
    const transportMethodItems = await this.transportMethodRepository.count();
    if (transportMethodItems) {
      return;
    }
    await this.transportMethodRepository.insert(TRANSPORT_METHOD_DATA);
  }

  selectDeliveryMethodById(id: number): Promise<DeliveryMethod> {
    return this.transportMethodRepository.findOne({
      where: { id },
    });
  }
}
