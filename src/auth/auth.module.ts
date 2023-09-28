import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from "@nestjs/passport";
import { FirebaseAuthStrategy } from "@/auth/strategies/firebase-auth.strategy";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'firebase-jwt' })
  ],
  providers: [AuthService ,FirebaseAuthStrategy],
  exports : [PassportModule]
})
export class AuthModule {}
