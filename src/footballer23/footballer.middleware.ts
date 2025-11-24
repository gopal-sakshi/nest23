import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';


/*** APPLIEs to all routes of footballer ************************/
@Injectable()
export class Footballer23Middleware implements NestMiddleware {
  
  constructor() {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    if(authHeader === 'football_admin23') {
        next();
        return;
    } else {
        throw new UnauthorizedException('Invalid football Authorization header');
    }
  }
}
