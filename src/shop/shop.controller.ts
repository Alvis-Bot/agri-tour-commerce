import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { Routers } from "@/common/enums/routers";
import { ShopService } from "@/shop/shop.service";
import { Note } from "@/common/decorator/note.decorator";
import { ShopCreateDto } from "@/shop/dto/shop-create.dto";
import { FirebaseAuthGuard } from "@/auth/guard/firebase-auth.guard";
import { AuthUser } from "@/common/decorator/user.decorator";
import { User } from "@/common/entities/user";
import { Pagination } from "@/common/pagination/pagination.dto";
import { ACGuard, UseRoles } from "nest-access-control";
import { Public } from "@/common/decorator/public.meta";

@Controller(Routers.SHOP)
@UseGuards(FirebaseAuthGuard , ACGuard)
export class ShopController {
  constructor(
    private readonly shopService: ShopService,
  ) {}


  @Post()
  @UseRoles({
    resource: "shop", // 👈 resource
    action: "create", // 👈 action (e.g., create:own, update:any, read:own, delete:own)
    possession: "own", // 👈 possession (e.g., own, any) // own : chỉ tác động vào shop của chính mình
  })
  @Note('Tạo mới shop (user)')
  async createShop(
    @AuthUser() myUser : User,
    @Body() dto: ShopCreateDto
  ) {
    return await this.shopService.createShop(dto,myUser);
  }



  @Get('me')
  @UseRoles({
    resource: "shop", // 👈 resource
    action: "read", // 👈 action (e.g., create:own, update:any, read:own, delete:own)
    possession: "own", // 👈 possession (e.g., own, any) // own : chỉ tác động vào shop của chính mình
  })
  @Note('Lấy thông tin shop của tôi (shop)')
  async  getMyShop(
    @AuthUser() myUser : User,
  ) {
    return await this.shopService.getMyShop(myUser);
  }


  @Get()
  @Public()
  @Note('Lấy danh sách shop (public)')
  async  getShops(
    @Query() pagination : Pagination
  ) {
    console.log(pagination);
    return await this.shopService.getShopsPaginate(pagination);
  }
}
