import { Module } from '@nestjs/common';
import { MessagingGateway } from '@/gateway/gateway';
import { GatewaySessionManager } from '@/gateway/gateway.session';

@Module({
  imports: [],
  controllers: [],
  providers: [MessagingGateway, GatewaySessionManager],
})
export class GatewayModule {}
