import { Controller, Get, Inject } from '@nestjs/common';
import { Routers } from '@/common/enums/routers';
import { Service } from '@/common/enums/service';
import { IDeliveryMethodService } from '@/delivery-methods/service/delivery-methods';
import { Note } from '@/common/decorator/note.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller(Routers.DELIVERY_METHODS)
@ApiTags('APIs for Delivery Methods (Phương thức vận chuyển)')
export class DeliveryMethodsController {
  constructor(
    @Inject(Service.TRANSPORT_METHODS_SERVICE)
    private readonly transportMethodsService: IDeliveryMethodService,
  ) {}

  @Get()
  @Note('Lấy danh sách phương thức vận chuyển')
  async getTransportMethods() {
    return this.transportMethodsService.getDeliveryMethods();
  }
}
