import { IoAdapter } from "@nestjs/platform-socket.io";
import { User } from "@/common/entities/user.entity";
import { Socket } from "socket.io";
import { INestApplicationContext } from "@nestjs/common";
import { UsersService } from "@/users/users.service";
import { auth } from "firebase-admin";

export interface AuthenticatedSocket extends Socket {
  user: User;
}


export class WebsocketAdapter extends IoAdapter {

  private usersService: UsersService;

  constructor(private app: INestApplicationContext) {
    super(app);
    this.usersService = this.app.get(UsersService);
  }

  createIOServer(port: number, options?: any) {
    const server = super.createIOServer(port, options);
    server.use(async (socket: AuthenticatedSocket, next: any) => {
      try {
        const token = socket.handshake.query.token as string;
        const decoded = await auth().verifyIdToken(token);
        socket.user = await this.usersService.findOneByUid(decoded.uid);
        next();
      } catch (e) {
        console.log(e);
        next(e);
      }
    });
    return server;
  }
}