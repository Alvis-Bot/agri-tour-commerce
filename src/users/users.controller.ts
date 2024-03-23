import {
	Body,
	Controller,
	Get,
	Patch,
	Query,
	Req,
	UseGuards,
} from '@nestjs/common';
import { Routers } from '@/common/enums/routers';
import { UsersService } from '@/users/users.service';
import { User } from '@/common/entities/user.entity';
import { FirebaseAuthGuard } from '@/auth/guard/firebase-auth.guard';
import { UserUpdateDto } from '@/users/dto/user-update.dto';
import { ApiTags } from '@nestjs/swagger';
import { Note } from '@/common/decorator/note.decorator';
import { AuthUser } from '@/common/decorator/user.decorator';
import { Pagination } from '@/common/pagination/pagination.dto';
import { Public } from '@/common/decorator/public.meta';
import { RoleGuard } from '@/auth/guard/role.guard';
import { Roles } from '@/common/decorator/roles.decorator';
import { RolesEnum } from '@/common/enums/roles.enum';
import { AuthenticatedRequest } from '@/common/interface';

@Controller(Routers.USERS)
@UseGuards(FirebaseAuthGuard, RoleGuard)
@ApiTags('APIs users - Quản lý tài khoản')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Patch('')
	@Roles(RolesEnum.USER)
	@Note('Cập nhật thông tin tài khoản')
	async updateMyInfo(
		@Body() dto: UserUpdateDto,
		@Req() req: AuthenticatedRequest,
	) {
		return await this.usersService.updateMyInfo(dto, req.user);
	}

	// @Post()
	// @Note('Cập nhật token firebase (hiện tại chưa cần dùng)')
	// async login(@Body() dto: LoginDto, @Req() req: AuthRequest) {
	// 	return await this.usersService.updateFcmToken(dto, req.user);
	// }

	@Get('me')
	@Roles(RolesEnum.USER)
	@Note('Lấy thông tin tài khoản')
	async getMyInfo(@AuthUser() user: User) {
		return await this.usersService.getMyInfo(user);
	}

	@Get('')
	@Public()
	@Note('Lấy danh sách tài khoản')
	async getUsersWithPagination(@Query() pagination: Pagination) {
		return await this.usersService.getUsersWithPagination(pagination);
	}
}
