import { AuthGuard } from "@nestjs/passport";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class FirebaseAuthGuard extends AuthGuard('firebase-jwt'){

    constructor(private reflector: Reflector) {
        super();
    }

     canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.get<boolean>(
            'isPublic',
            context.getHandler(),
        );
        console.log('isPublic', isPublic);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }



}