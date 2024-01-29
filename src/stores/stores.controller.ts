import {
	Body,
	Controller,
	Get,
	Post,
	Query,
	UploadedFiles,
	UseGuards,
} from '@nestjs/common';
import { Routers } from '@/common/enums/routers';
import { StoresService } from '@/stores/stores.service';
import { Note } from '@/common/decorator/note.decorator';
import { CombinedDto } from '@/stores/dto/store-create.dto';
import { FirebaseAuthGuard } from '@/auth/guard/firebase-auth.guard';
import { AuthUser } from '@/common/decorator/user.decorator';
import { User } from '@/common/entities/user.entity';
import { Pagination } from '@/common/pagination/pagination.dto';
import { ACGuard, UseRoles } from 'nest-access-control';
import { Public } from '@/common/decorator/public.meta';
import { ApiTags } from '@nestjs/swagger';
import { ApiFileFields } from '@/common/decorator/file.decorator';
import { MulterUtils } from '@/common/utils/multer.utils';
import { UploadTypesEnum } from '@/common/enums/upload-types.enum';

@Controller(Routers.STORE)
@UseGuards(FirebaseAuthGuard, ACGuard)
@ApiTags('APIs for store - API cửa hàng')
export class StoresController {
	constructor(private readonly shopService: StoresService) {}

	@Post()
	@UseRoles({
		resource: 'shop', // 👈 resource
		action: 'create', // 👈 action (e.g., create:own, update:any, read:own, delete:own)
		possession: 'own', // 👈 possession (e.g., own, any) // own : chỉ tác động vào store của chính mình
	})
	@Note('Tạo mới store (user)')
	@ApiFileFields(
		[
			{
				name: 'businessLicense',
				maxCount: 1,
			},
			{
				name: 'identityImage',
				maxCount: 1,
			},
			{
				name: 'identityImageHold',
				maxCount: 1,
			},
		],
		MulterUtils.getConfig(UploadTypesEnum.IMAGES),
	)
	async createShop(
		@UploadedFiles()
		files: {
			businessLicense: Express.Multer.File[];
			identityImage: Express.Multer.File[];
			identityImageHold: Express.Multer.File[];
		},
		@AuthUser() myUser: User,
		@Body() dto: CombinedDto,
	) {
		console.log(dto);
		return await this.shopService.createShop(
			dto,
			myUser,
			files.businessLicense,
			files.identityImage,
			files.identityImageHold,
		);
	}

	@Get('me')
	@Note('Lấy thông tin store của tôi (store)')
	async getStore(@AuthUser() myUser: User) {
		return await this.shopService.getStoreByUser(myUser);
	}

	@Get()
	@Public()
	@Note('Lấy danh sách store (public)')
	async getShops(@Query() pagination: Pagination) {
		return await this.shopService.getShopsPaginate(pagination);
	}
}
