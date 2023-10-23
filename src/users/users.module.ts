import { Global, Module } from "@nestjs/common";
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@/common/entities/user.entity";
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
