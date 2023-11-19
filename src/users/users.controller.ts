import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Routers } from '@/common/enums/routers';
import { LoginDto } from '@/users/dto/login.dto';
import { UsersService } from '@/users/users.service';
import { User } from '@/common/entities/user.entity';
import { FirebaseAuthGuard } from '@/auth/guard/firebase-auth.guard';
import { UserUpdateDto } from '@/users/dto/user-update.dto';
import { ApiTags } from '@nestjs/swagger';
import { Note } from '@/common/decorator/note.decorator';
import { ACGuard, UseRoles } from 'nest-access-control';
import { AuthUser } from '@/common/decorator/user.decorator';

interface AuthRequest {
  user: User;
}

@Controller(Routers.USERS)
@UseGuards(FirebaseAuthGuard, ACGuard)
@ApiTags('UserEntity APIs  - Quản lý tài khoản')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('')
  @UseRoles({
    resource: 'users', // 👈 resource
    action: 'update', // 👈 action (e.g., create:own, update:any, read:own, delete:own)
    possession: 'own', // 👈 possession (e.g., own, any)
  })
  @Note('Cập nhật thông tin tài khoản')
  async updateInfo(@Body() dto: UserUpdateDto, @Req() req: AuthRequest) {
    return await this.usersService.updateAccount(dto, req.user);
  }

  @Post()
  @UseRoles({
    resource: 'users', // 👈 resource
    action: 'update', // 👈 action (e.g., create:own, update:any, read:own, delete:own)
    possession: 'own', // 👈 possession (e.g., own, any)
  })
  @Note('Cập nhật token firebase (hiện tại chưa cần dùng)')
  async login(@Body() dto: LoginDto, @Req() req: AuthRequest) {
    return await this.usersService.updateFcmToken(dto, req.user);
  }

  @Get('me')
  @UseRoles({
    resource: 'users', // 👈 resource
    action: 'read', // 👈 action (e.g., create:own, update:any, read:own, delete:own)
    possession: 'own', // 👈 possession (e.g., own, any)
  })
  @Note('Lấy thông tin tài khoản')
  async getAccount(@AuthUser() user: User) {
    return await this.usersService.getAccount(user);
  }
}
