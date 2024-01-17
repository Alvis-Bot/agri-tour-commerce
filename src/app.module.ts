import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionsModule } from './regions/regions.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';
import { StoreModule } from './shop/store.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from '@/auth/role.builder';
import { ProductsModule } from './products/products.module';
import { GatewayModule } from './gateway/gateway.module';
import { OrdersModule } from './orders/orders.module';
import { ProductRatingModule } from './product-rating/product-rating.module';
import { DeliveryMethodsModule } from './delivery-methods/delivery-methods.module';
import { ProductPricesModule } from './product-prices/product-prices.module';

console.log(process.env.DB_PASSWORD);
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [`.env.${process.env.NODE_ENV}`, `.env`],
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'public'),
			serveRoot: '/public',
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'uploads'),
			serveRoot: '/',
		}),
		AccessControlModule.forRoles(roles),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('DB_HOST'),
				port: configService.get('DB_PORT'),
				database: configService.get('DB_NAME'),
				username: configService.get('DB_USERNAME'),
				password: configService.get<string>('DB_PASSWORD'),
				entities: [__dirname + '/**/*.entity{.ts,.js}'],
				synchronize: true,
				logging: ['warn', 'error'],
				autoLoadEntities: true,
			}),
			inject: [ConfigService],
		}),

		AuthModule,
		FirebaseModule,
		UsersModule,
		RegionsModule,
		ProductCategoriesModule,
		StoreModule,
		ProductsModule,
		GatewayModule,
		OrdersModule,
		ProductRatingModule,
		DeliveryMethodsModule,
		ProductPricesModule,
	],
})
export class AppModule {}
