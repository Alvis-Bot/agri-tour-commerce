import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { AuthenticatedSocket } from '@/gateway/gateway.adapter';
import { GatewaySessionManager } from '@/gateway/gateway.session';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
  pingInterval: 10000,
  pingTimeout: 15000,
})
export class MessagingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly session: GatewaySessionManager) {}

  handleConnection(client: AuthenticatedSocket, ...args: any[]): any {
    console.log('connected');
    this.session.setUserSocketId(client.user.id, client.id);
    console.log(this.session.getSockets());
  }

  handleDisconnect(client: AuthenticatedSocket): any {
    this.session.removeSocketId(client.user.id, client.id);
    if (!this.session.getUserSocket(client.user.id)?.length) {
      this.session.removeUserSocketId(client.user.id);
    }
    console.log(this.session.getSockets());
  }
}
