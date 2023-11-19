import { Controller, Get, Param, Query } from '@nestjs/common';
import { Routers } from '@/common/enums/routers';
import { RegionsService } from '@/regions/regions.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Note } from '@/common/decorator/note.decorator';
import { Pagination } from '@/common/pagination/pagination.dto';

@Controller(Routers.REGIONS)
@ApiTags('APIs for regions (provinces, districts, wards)')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Get('provinces')
  @Note('Lấy danh sách các tỉnh thành')
  async getProvinces() {
    return await this.regionsService.getProvinces();
  }

  @Get('districts')
  @Note('Lấy danh sách các quận huyện')
  async getDistricts() {
    return await this.regionsService.getDistricts();
  }

  @ApiParam({
    name: 'code',
    description: 'Mã tỉnh thành',
    example: '01',
  })
  @Get('districts/:code')
  @Note('Lấy danh sách các quận huyện theo mã tỉnh thành')
  async getDistrictsByProvinceCode(@Param('code') code: string) {
    return await this.regionsService.getDistrictsByProvinceCode(code);
  }

  @Get('wards')
  @Note('Lấy danh sách các phường xã')
  async getWards(@Query() pagination: Pagination) {
    return await this.regionsService.getWards(pagination);
  }

  @ApiParam({
    name: 'code',
    description: 'Mã quận huyện',
    example: '001',
  })
  @Get('wards/:code')
  @Note('Lấy danh sách các phường xã theo mã quận huyện')
  async getWardsByDistrictCode(@Param('code') code: string) {
    return await this.regionsService.getWardsByDistrictCode(code);
  }
}
