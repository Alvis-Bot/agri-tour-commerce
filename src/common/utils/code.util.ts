import { Location } from '@/common/entities/store/location.entity';

export class CodeUtil {
	public static async isLocationExists(
		store?: Location[],
		provinceCode?: string,
		districtCode?: string,
		wardCode?: string,
		address?: string,
	): Promise<boolean> {
		if (!store || store.length === 0) return false;
		return store.some(
			(location) =>
				location.province.code === provinceCode &&
				location.district.code === districtCode &&
				location.ward.code === wardCode &&
				location.address === address,
		);
	}
}
