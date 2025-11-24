import { Controller, Get, Req, Res } from '@nestjs/common';
import { Cats23ExamineReqObject } from './cats23.interface';

@Controller('cats23')
export class Cats23Controller {
  @Get()
  getAllCats23():string {
    return 'cat1, cat2, cat3, cat4';
  }
  @Get('get3Cats')
  get3Cats23():string {
    return 'cat1, cat2, cat3'
  }
  @Get('get3CatsExpress')
  get3CatsExpressThingy(@Res() response):string {
    return response.status(200).send('express - cat1, cat2, cat3');
  }
  // @Get('examineReqObject23')
  // examineReqObject(@Req() request23:Request, @Res response23:Response):Cats23ExamineReqObject {
    
  // }
}
