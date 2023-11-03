import { RolesBuilder } from "nest-access-control";

export enum UserRole {
  ADMIN = "ADMIN",
  SHOP = "SHOP",
  USER = "USER"

}

export const roles: RolesBuilder = new RolesBuilder();

roles
   // USER : xem thông tin cá nhân , sửa thông tin cá nhân
  .grant(UserRole.USER)
  .readOwn("users")
  .updateOwn("users")
  .readAny('product-rating')
  .createAny('product-rating')
  .updateAny('product-rating')
  .createOwn('shop') // user có thể tạo shop cho mình
  // SHOP : xem thông tin shop của mình , sửa thông tin shop của mình , shop tạo category , product
  .grant(UserRole.SHOP)
  .extend(UserRole.USER)
  .readOwn("shop")
  .updateOwn("shop")
  .readOwn("product-categories")
  .createOwn("product-categories")
  .updateOwn("product-categories")
  .deleteOwn("product-categories")
  .createOwn("products")
  .updateOwn("products")
  .deleteOwn("products")
  // ADMIN : xem thông tin tất cả user , shop , category , product , sửa thông tin tất cả user , shop , category , product , xóa tất cả user , shop , category , product
  .grant(UserRole.ADMIN)
  .extend(UserRole.SHOP)
  .readAny("users")
  .updateAny("users")
  .deleteAny("users")
  .readAny("shop")
  .updateAny("shop")
  .deleteAny("shop")
  .readAny("product-categories")
  .updateAny("product-categories")
  .deleteAny("product-categories")
  .readAny("products")
  .updateAny("products")
  .deleteAny("products");

