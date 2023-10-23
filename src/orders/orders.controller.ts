import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { Routers } from "@/common/enums/routers";
import { OrdersService } from "@/orders/orders.service";
import { OrderCreateDto } from "@/orders/dto/order-create.dto";
import { Pagination } from "@/common/pagination/pagination.dto";
import { FirebaseAuthGuard } from "@/auth/guard/firebase-auth.guard";
import { AuthUser } from "@/common/decorator/user.decorator";
import { User } from "@/common/entities/user.entity";

@Controller(Routers.ORDERS)
@UseGuards(FirebaseAuthGuard)
export class OrdersController {

  constructor(
    private readonly ordersService: OrdersService,
  ) {}


  @Post()
  async createOrder(
    @AuthUser() myUser : User,
    @Body() dto: OrderCreateDto
  ){
    return await this.ordersService.createOrder(dto ,myUser);
  }



  @Get()
  async getOrders(
    @Query() pagination : Pagination
  ){
    return await this.ordersService.getOrdersPagination(pagination);
  }

}
