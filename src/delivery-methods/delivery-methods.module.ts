import { Module } from '@nestjs/common';
import { DeliveryMethodsService } from './service/delivery-methods.service';
import { DeliveryMethodsController } from './delivery-methods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryMethod } from '@/common/entities/store/delivery-method.entity';
import { Service } from '@/common/enums/service';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryMethod])],
  providers: [
    {
      provide: Service.TRANSPORT_METHODS_SERVICE,
      useClass: DeliveryMethodsService,
    },
  ],
  controllers: [DeliveryMethodsController],
  exports: [Service.TRANSPORT_METHODS_SERVICE],
})
export class DeliveryMethodsModule {}
