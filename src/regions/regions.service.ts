import { Injectable } from '@nestjs/common';
import { Province } from '@/common/entities/province.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { District } from '@/common/entities/district.entity';
import { Ward } from '@/common/entities/ward.entity';
import { Pagination } from '@/common/pagination/pagination.dto';
import { Meta } from '@/common/pagination/meta.dto';
import { PaginationModel } from '@/common/pagination/pagination.model';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>,
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
    @InjectRepository(Ward)
    private readonly wardRepository: Repository<Ward>,
  ) {}

  async getProvinces() {
    return await this.provinceRepository
      .createQueryBuilder('province')
      // xắp xếp theo tên tỉnh
      .orderBy('province.name', 'ASC')
      // lấy ra các trường cần thiết
      .select(['province.code', 'province.name', 'province.nameEn'])
      .getMany();
  }

  async getProvinceByCode(code: string) {
    return await this.provinceRepository
      .createQueryBuilder('province')
      // xắp xếp theo tên tỉnh
      .orderBy('province.name', 'ASC')
      // lấy ra các trường cần thiết
      .select(['province.code', 'province.name', 'province.nameEn'])
      // lọc theo mã tỉnh thành
      .where('province.code = :code', { code })
      .getOne();
  }

  async getDistrictByCode(code: string) {
    return await this.districtRepository
      .createQueryBuilder('district')
      // xắp xếp theo tên tỉnh
      .orderBy('district.name', 'ASC')
      // lấy ra các trường cần thiết
      .select(['district.code', 'district.name', 'district.nameEn'])
      // lọc theo mã tỉnh thành
      .where('district.code = :code', { code })
      .getOne();
  }

  async getWardByCode(code: string) {
    return await this.wardRepository
      .createQueryBuilder('ward')
      // xắp xếp theo tên tỉnh
      .orderBy('ward.name', 'ASC')
      // lấy ra các trường cần thiết
      .select(['ward.code', 'ward.name', 'ward.nameEn'])
      // lọc theo mã tỉnh thành
      .where('ward.code = :code', { code })
      .getOne();
  }

  async getDistricts() {
    return await this.districtRepository
      .createQueryBuilder('district')
      // xắp xếp theo tên quận huyện
      .orderBy('district.name', 'ASC')
      // lấy ra các trường cần thiết
      // .select(['district.code', 'district.name', 'district.nameEn'])
      .getMany();
  }

  async getDistrictsByProvinceCode(code: string) {
    return await this.districtRepository
      .createQueryBuilder('district')
      // xắp xếp theo tên quận huyện
      .orderBy('district.name', 'ASC')
      // lấy ra các trường cần thiết
      // .select(['district.code', 'district.name', 'district.nameEn'])
      // lọc theo mã tỉnh thành
      .where('district.province_code = :code', { code })
      .getMany();
  }

  async getWards(pagination: Pagination): Promise<PaginationModel<District>> {
    const queryBuilder = this.districtRepository
      .createQueryBuilder('district')
      .take(pagination.take)
      .skip(pagination.skip)
      // xắp xếp theo tên quận huyện
      .orderBy('district.name', 'ASC');
    // lấy ra các trường cần thiết
    // .select(['district.code', 'district.name', 'district.nameEn'])

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel(entities, meta);
  }

  async getWardsByDistrictCode(code: string) {
    return await this.wardRepository
      .createQueryBuilder('ward')
      // xắp xếp theo tên quận huyện
      .orderBy('ward.name', 'ASC')
      // lấy ra các trường cần thiết
      // .select(['ward.code', 'ward.name', 'ward.nameEn'])
      // lọc theo mã quận huyện
      .where('ward.district_code = :code', { code })
      .getMany();
  }
}
