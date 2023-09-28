import { HttpStatus } from "@nestjs/common";
import { IError } from "@/exception/api.exception";




type ErrorFactory = (status: HttpStatus, message: string) => IError;

const errorFactory: ErrorFactory = (status: HttpStatus, message: string) : IError => ({
  status,
  message
});
export const ErrorMessages = {
  FORBIDDEN: errorFactory(HttpStatus.FORBIDDEN, "Forbidden"),
  USER_EXISTED: errorFactory(HttpStatus.CONFLICT, "User existed"),
  USER_NOT_FOUND: errorFactory(HttpStatus.NOT_FOUND, "User not found"),
  //
  CATEGORY_PRODUCT_EXISTED: errorFactory(HttpStatus.CONFLICT, "Category product existed"),
  CATEGORY_PRODUCT_NOT_FOUND: errorFactory(HttpStatus.NOT_FOUND, "Category product not found"),
  PROVINCE_NOT_FOUND: errorFactory(HttpStatus.NOT_FOUND, "Province not found"),
  DISTRICT_NOT_FOUND: errorFactory(HttpStatus.NOT_FOUND, "District not found"),
  WARD_NOT_FOUND: errorFactory(HttpStatus.NOT_FOUND, "Ward not found"),
  SHOP_ALREADY_EXISTS: errorFactory(HttpStatus.CONFLICT, "Shop already exists"),
  SHOP_NOT_FOUND: errorFactory(HttpStatus.NOT_FOUND, "Shop not found"),


};

