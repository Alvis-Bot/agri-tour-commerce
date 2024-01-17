import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from '@/common/entities/store/store.entity';
import { DeliveryOption } from '@/common/entities/store/delivery-option.entity';
import { DeliveryMethodsModule } from '@/delivery-methods/delivery-methods.module';
import { Location } from '@/common/entities/store/location.entity';
import { Identity } from '@/common/entities/store/identity.entity';

@Module({
  imports: [
    DeliveryMethodsModule,
    TypeOrmModule.forFeature([Store, DeliveryOption, Location, Identity]),
  ],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService],
})
export class StoreModule {}
