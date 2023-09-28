import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy, ExtractJwt } from "passport-firebase-jwt";
import { FirebaseService } from "@/firebase/firebase.service";
import { auth } from "firebase-admin";
import { UsersService } from "@/users/users.service";

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy) {

  constructor(
    private usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    });
  }

  async validate(token: string) {
    const decodedIdToken = await auth()
      .verifyIdToken(token, true)
      .catch((err) => {
        switch (err.code) {
          case "auth/id-token-expired":
            throw new UnauthorizedException("Token is expired");
          default:
            throw new UnauthorizedException("Token is invalid");
        }
      });

    switch (decodedIdToken.firebase.sign_in_provider) {
      case "phone" :
        // nếu user không có trong db thì tạo mới
        const user = await this.usersService.findOneByPhone(decodedIdToken.phone_number);
        return user || await this.usersService.createBaseUser({
          phone: decodedIdToken.phone_number,
          uid: decodedIdToken.uid,
          provider: decodedIdToken.firebase.sign_in_provider
        });
      default:
        throw new UnauthorizedException();
    }

  }
}