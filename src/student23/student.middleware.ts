import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';


/*** APPLIEs to only some routes of student ************************/
@Injectable()
export class Student23Middleware implements NestMiddleware {
  
  constructor() {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    if(authHeader === 'student_admin23') {
        next();
        return;
    } else {
        throw new UnauthorizedException('Invalid student Authorization header');
    }
  }
}
