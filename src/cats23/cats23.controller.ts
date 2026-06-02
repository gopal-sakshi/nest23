import { Controller, Get, Req, Res, UseInterceptors } from '@nestjs/common';
import { Cats23ExamineReqObject } from './cats23.interface';
import { ControllerInterceptor23 } from '@app/utils23/interceptors23/controller-interceptor';
import { Cats23Service } from './cats23.service';

@UseInterceptors(ControllerInterceptor23)
@Controller('cats23')
export class Cats23Controller {

    constructor(private readonly catsService: Cats23Service) { }

    @Get()
    getAllCats23(): string {
        return 'cat1, cat2, cat3, cat4';
    }
    @Get('get3Cats')
    get3Cats23(): string {
        return 'cat1, cat2, cat3'
    }
    @Get('get3CatsExpress')
    get3CatsExpressThingy(@Res() response): string {
        return response.status(200).send('express - cat1, cat2, cat3');
    }

    @Get('learnRetryDecorator23')
    async getCatsWithRetry(@Res() response): Promise<string[]> {
        const resp23 = await this.catsService.getCatsWithRetry();
        return response.status(200).send(resp23);
    }

}
