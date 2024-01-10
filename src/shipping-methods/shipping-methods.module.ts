import { Global, Module } from '@nestjs/common';
import { ShippingMethodsService } from './shipping-methods.service';
import { ShippingMethodsController } from './shipping-methods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingMethod } from '@/common/entities/shipping-method.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ShippingMethod])],
  providers: [ShippingMethodsService],
  controllers: [ShippingMethodsController],
  exports: [ShippingMethodsService],
})
export class ShippingMethodsModule {}
