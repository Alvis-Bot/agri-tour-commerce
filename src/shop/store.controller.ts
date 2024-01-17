import {
	Body,
	Controller,
	Get,
	Patch,
	Post,
	Query,
	UploadedFile,
	UploadedFiles,
	UseGuards,
} from '@nestjs/common';
import { Routers } from '@/common/enums/routers';
import { StoreService } from '@/shop/store.service';
import { Note } from '@/common/decorator/note.decorator';
import {
	StoreCreateDto,
	StoreUpdateStepOneDto,
	StoreUpdateStepThreeDto,
	StoreUpdateStepTwoDto,
} from '@/shop/dto/store-create.dto';
import { FirebaseAuthGuard } from '@/auth/guard/firebase-auth.guard';
import { AuthUser } from '@/common/decorator/user.decorator';
import { User } from '@/common/entities/user.entity';
import { Pagination } from '@/common/pagination/pagination.dto';
import { ACGuard, UseRoles } from 'nest-access-control';
import { Public } from '@/common/decorator/public.meta';
import { ApiTags } from '@nestjs/swagger';
import { ApiFile, ApiFileFields } from '@/common/decorator/file.decorator';
import { MulterUtils } from '@/common/utils/multer.utils';
import { UploadTypesEnum } from '@/common/enums/upload-types.enum';

@Controller(Routers.STORE)
@UseGuards(FirebaseAuthGuard, ACGuard)
@ApiTags('APIs for store - API cửa hàng')
export class StoreController {
	constructor(private readonly shopService: StoreService) {}

	@Post()
	@UseRoles({
		resource: 'shop', // 👈 resource
		action: 'create', // 👈 action (e.g., create:own, update:any, read:own, delete:own)
		possession: 'own', // 👈 possession (e.g., own, any) // own : chỉ tác động vào store của chính mình
	})
	@Note('Tạo mới store (user)')
	async createShop(@AuthUser() myUser: User, @Body() dto: StoreCreateDto) {
		console.log(dto);
		return await this.shopService.createShop(dto, myUser);
	}

	@Patch('step/one')
	@Note('Cập nhật thông tin cơ bản của store (user)')
	async updateShopStepOne(
		@AuthUser() myUser: User,
		@Body() dto: StoreUpdateStepOneDto,
	) {
		return await this.shopService.updateShopStepOne(dto, myUser);
	}

	@Patch('step/two')
	@ApiFile('businessLicense', MulterUtils.getConfig(UploadTypesEnum.IMAGES))
	@Note('Cập nhật thông tin cơ bản của store (user)')
	async updateShopStepTwo(
		@UploadedFile() businessLicense: Express.Multer.File,
		@AuthUser() myUser: User,
		@Body() dto: StoreUpdateStepTwoDto,
	) {
		return await this.shopService.updateShopStepTwo(
			dto,
			myUser,
			businessLicense,
		);
	}

	@Patch('step/three')
	@ApiFileFields(
		[
			// gấu phép khinh doanh
			{ name: 'identityImage', maxCount: 1 },
			// hình ảnh đại diện kèm cccd
			{ name: 'identityImageHold', maxCount: 1 },
		],
		MulterUtils.getConfig(UploadTypesEnum.IMAGES),
	)
	async updateShopStepThree(
		@UploadedFiles()
		files: {
			identityImage: Express.Multer.File[];
			identityImageHold: Express.Multer.File[];
		},
		@AuthUser() myUser: User,
		@Body() dto: StoreUpdateStepThreeDto,
	) {
		return await this.shopService.updateShopStepThree(dto, myUser, files);
	}

	@Get('me')
	@Note('Lấy thông tin store của tôi (store)')
	async getStore(@AuthUser() myUser: User) {
		return await this.shopService.getStoreByUser(myUser);
	}

	@Note('Lấy trạng thái của step')
	@Get('step')
	async getStep(@AuthUser() myUser: User) {
		return await this.shopService.getStep(myUser);
	}

	@Get()
	@Public()
	@Note('Lấy danh sách store (public)')
	async getShops(@Query() pagination: Pagination) {
		console.log(pagination);
		return await this.shopService.getShopsPaginate(pagination);
	}
}
