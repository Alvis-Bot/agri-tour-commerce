import { DeliveryMethod } from '@/common/entities/store/delivery-method.entity';

export interface IDeliveryMethodService {
	getDeliveryMethods(): Promise<DeliveryMethod[]>;

	selectDeliveryMethodById(id: number): Promise<DeliveryMethod>;
}
