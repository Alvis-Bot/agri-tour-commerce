import { Body, Controller, Get, Post } from '@nestjs/common';
import { ShippingMethodsService } from '@/shipping-methods/shipping-methods.service';
import { ShippingMethodCreateDto } from '@/shipping-methods/dto/shipping-method-create.dto';
import { ApiTags } from '@nestjs/swagger';
import { Note } from '@/common/decorator/note.decorator';

@Controller('shipping-methods')
@ApiTags('APIs for shipping methods - APIs phương thức vận chuyển')
export class ShippingMethodsController {
  constructor(
    private readonly shippingMethodsService: ShippingMethodsService,
  ) {}

  @Get()
  @Note('Lấy danh sách phương thức vận chuyển')
  async getShippingMethods() {
    return await this.shippingMethodsService.selectManyShippingMethods();
  }

  @Post()
  @Note('Tạo mới phương thức vận chuyển')
  async createShippingMethod(@Body() dto: ShippingMethodCreateDto) {
    return await this.shippingMethodsService.createShippingMethod(dto);
  }
}
