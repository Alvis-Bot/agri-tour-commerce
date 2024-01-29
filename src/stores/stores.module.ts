import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from '@/common/entities/store/store.entity';
import { DeliveryOption } from '@/common/entities/store/delivery-option.entity';
import { DeliveryMethodsModule } from '@/delivery-methods/delivery-methods.module';
import { Location } from '@/common/entities/store/location.entity';
import { Identity } from '@/common/entities/store/identity.entity';
import { User } from '@/common/entities/user.entity';

@Module({
	imports: [
		DeliveryMethodsModule,
		TypeOrmModule.forFeature([Store, DeliveryOption, Location, Identity, User]),
	],
	controllers: [StoresController],
	providers: [StoresService],
	exports: [StoresService],
})
export class StoresModule {}
