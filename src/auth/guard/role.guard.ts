import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RolesEnum } from '@/common/enums/roles.enum';
import { AccessControlService } from '@/shared/access-control.service';
import { ROLE_KEY } from '@/common/decorator/roles.decorator';
import { User } from '@/common/entities/user.entity';

export class TokenDto {
	id: number;
	roles: RolesEnum;
}

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private accessControlService: AccessControlService,
	) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(
			ROLE_KEY,
			[context.getHandler(), context.getClass()],
		);

		console.log('requiredRoles', requiredRoles);

		const request = context.switchToHttp().getRequest();
		const token = request.user as User;
		console.log('token', token);

		if (!requiredRoles) {
			return true;
		}

		for (const role of requiredRoles) {
			const result = this.accessControlService.isAuthorized({
				requiredRole: role,
				currentRole: token.roles,
			});

			if (result) {
				return true;
			}
		}

		return false;
	}
}
