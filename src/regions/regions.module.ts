import { Global, Module } from '@nestjs/common';
import { RegionsController } from './regions.controller';
import { RegionsService } from './regions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from '@/common/entities/province.entity';
import { District } from '@/common/entities/district.entity';
import { Ward } from '@/common/entities/ward.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([District, Province, Ward])],
  controllers: [RegionsController],
  providers: [RegionsService],
  exports: [RegionsService],
})
export class RegionsModule {}
