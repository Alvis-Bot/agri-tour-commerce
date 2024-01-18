import { Product } from '@/common/entities/product/product.entity';
import { ProductPrice } from '@/common/entities/product/product-price.entity';
import { ProductCategory } from '@/common/entities/product/product-category.entity';
import { Store } from '@/common/entities/store/store.entity';

export class ProductModal {
	id: number;
	name: string;
	weight: number;
	unit: string;
	description: string;
	isActive: boolean;
	productPrice: ProductPriceModal;
	images: string[];
	productCategory: ProductCategoryModal;
	store: StoreModal;

	constructor() {
		this.productPrice = new ProductPriceModal();
		this.productCategory = new ProductCategoryModal();
		this.store = new StoreModal();
	}

	public loadFromEntity(entity: Product) {
		this.id = entity.id;
		this.name = entity.name;
		this.weight = entity.weight;
		this.unit = entity.unit;
		this.description = entity.description;
		this.isActive = entity.isActive;
		this.images = entity.images;
		return this;
	}

	public loadFromProductPrice(entity: ProductPrice) {
		console.log(entity);
		this.productPrice.salePrice = entity.retailPrice;
		this.productPrice.salePrice = entity.salePrice;
		this.productPrice.saleStartDate = entity.saleStartDate;
		this.productPrice.saleEndDate = entity.saleEndDate;
		return this;
	}

	public loadFromProductCategory(entity: ProductCategory) {
		this.productCategory.id = entity.id;
		this.productCategory.name = entity.name;
		this.productCategory.image = entity.image;
		return this;
	}

	public loadFromStore(entity: Store) {
		this.store.id = entity.id;
		this.store.name = entity.name;
		this.store.phone = entity.phone;
		return this;
	}
}

export class ProductPriceModal {
	id: number;
	retailPrice: number;
	salePrice: number;
	saleStartDate: Date;
	saleEndDate: Date;

	public loadFromEntity(entity: ProductPrice) {
		this.id = entity.id;
		this.retailPrice = entity.retailPrice;
		this.salePrice = entity.salePrice;
		this.saleStartDate = entity.saleStartDate;
		this.saleEndDate = entity.saleEndDate;
		return this;
	}
}

export class ProductCategoryModal {
	id: number;
	name: string;
	image: string;

	public loadFromEntity(entity: ProductCategory) {
		this.id = entity.id;
		this.name = entity.name;
		this.image = entity.image;
		return this;
	}
}

export class StoreModal {
	id: number;
	name: string;
	phone: string;

	public loadFromEntity(entity: Store) {
		this.id = entity.id;
		this.name = entity.name;
		this.phone = entity.phone;
		return this;
	}
}
