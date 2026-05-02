import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationGuard implements CanActivate {
    
    constructor() { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const gqlContext = GqlExecutionContext.create(context);
        const { req } = gqlContext.getContext();
        const token = req.headers['auth2333'];
        if(!token) {
            return true;            // need to uncomment when we have proper auth in place
        } else {
            console.log("token23 ===> ", token);
            return true;
        }
    }

}