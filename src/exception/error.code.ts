import { HttpStatus } from '@nestjs/common';
import { IError } from '@/exception/api.exception';

type ErrorFactory = (status: HttpStatus, message: string) => IError;

const errorFactory: ErrorFactory = (
	status: HttpStatus,
	message: string,
): IError => ({
	status,
	message,
});
export const ErrorMessages = {
	FORBIDDEN: errorFactory(HttpStatus.FORBIDDEN, 'Forbidden'),
	USER_EXISTED: errorFactory(HttpStatus.CONFLICT, 'UserEntity existed'),
	USER_NOT_FOUND: errorFactory(HttpStatus.NOT_FOUND, 'UserEntity not found'),
	//
	CATEGORY_PRODUCT_EXISTED: errorFactory(
		HttpStatus.CONFLICT,
		'Category product existed',
	),
	CATEGORY_PRODUCT_NOT_FOUND: errorFactory(
		HttpStatus.NOT_FOUND,
		'Category product not found',
	),
	PROVINCE_NOT_FOUND: errorFactory(HttpStatus.NOT_FOUND, 'Province not found'),
	DISTRICT_NOT_FOUND: errorFactory(HttpStatus.NOT_FOUND, 'District not found'),
	WARD_NOT_FOUND: errorFactory(HttpStatus.NOT_FOUND, 'Ward not found'),
	STORE_ALREADY_EXISTS: errorFactory(
		HttpStatus.CONFLICT,
		'StoreEntity already exists',
	),
	STORE_NOT_FOUND: errorFactory(HttpStatus.NOT_FOUND, 'Store not found'),
	PRODUCT_NOT_FOUND: errorFactory(HttpStatus.NOT_FOUND, 'Product not found'),
	PRODUCT_RATING_EXIST: errorFactory(
		HttpStatus.CONFLICT,
		'Product rating existed',
	),
	SHIPPING_METHOD_NOT_FOUND: errorFactory(
		HttpStatus.NOT_FOUND,
		'Shipping method not found',
	),
	SHOP_STEP_NOT_FOUND: errorFactory(
		HttpStatus.NOT_FOUND,
		'Shop step not found',
	),
	STORE_STEP_INVALID: errorFactory(
		HttpStatus.BAD_REQUEST,
		'StoreEntity step invalid',
	),
	// Product không thuộc store
	PRODUCT_NOT_IN_STORE: errorFactory(
		HttpStatus.BAD_REQUEST,
		'Product not in store',
	),
	DELIVERY_METHOD_NOT_FOUND: errorFactory(
		HttpStatus.NOT_FOUND,
		'Delivery method not found',
	),
	ORDER_NOT_FOUND: errorFactory(HttpStatus.NOT_FOUND, 'Order not found'),
	CATEGORY_NAME_EXISTED: errorFactory(
		HttpStatus.CONFLICT,
		'Category name existed',
	),
	ARTICLE_CATEGORY_NOT_FOUND: errorFactory(
		HttpStatus.NOT_FOUND,
		'Article category not found',
	),
};
