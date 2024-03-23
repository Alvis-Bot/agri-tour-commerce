import { Global, Module } from '@nestjs/common';
import { AccessControlService } from '@/shared/access-control.service';

@Global()
@Module({
	imports: [],
	providers: [AccessControlService],
	exports: [AccessControlService],
})
export class SharedModule {}
