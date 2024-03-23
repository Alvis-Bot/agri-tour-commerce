import { Injectable } from '@nestjs/common';
import { RolesEnum } from '@/common/enums/roles.enum';

interface IsAuthorizedParams {
	currentRole: RolesEnum;
	requiredRole: RolesEnum;
}

@Injectable()
export class AccessControlService {
	private hierarchies: Array<Map<string, number>> = [];
	private priority = 1;

	constructor() {
		this.buildRoles([RolesEnum.USER, RolesEnum.SHOP, RolesEnum.ADMIN]);
		this.buildRoles([RolesEnum.MODERATOR, RolesEnum.ADMIN]);
	}

	private buildRoles(roles: RolesEnum[]) {
		const hierarchy: Map<string, number> = new Map();

		roles.forEach((role) => {
			hierarchy.set(role, this.priority);
			this.priority++;
		});

		this.hierarchies.push(hierarchy);
	}

	public isAuthorized({ currentRole, requiredRole }: IsAuthorizedParams) {
		for (const hierarchy of this.hierarchies) {
			const priority = hierarchy.get(currentRole);
			console.log('priority', priority);
			const requiredPriority = hierarchy.get(requiredRole);
			console.log('requiredPriority', requiredPriority);

			if (priority && requiredPriority && priority >= requiredPriority) {
				return true;
			}
		}

		return false;
	}
}
