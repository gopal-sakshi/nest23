import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, Sse, } from '@nestjs/common';
import { CreateFootballerDto } from 'src/footballer23/create-Footballer.dto';
import { UpdateFootballerDto } from 'src/footballer23/update-Footballer.dto';
import { FootballerService } from './footballer.service';
import { interval, map, Observable } from 'rxjs';

@Controller('footballer')
export class FootballerController {

    constructor(private readonly FootballerService: FootballerService) { }

    /***************************************************************************** */
    @Post()
    async createFootballer(
        @Res() response, 
        @Body() createFootballerDto: CreateFootballerDto
    ) {
        try {
            const newFootballer = await this.FootballerService.createFootballer(createFootballerDto);
            return response.status(HttpStatus.CREATED).json({message: 'Footballer has been created successfully', newFootballer });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({ statusCode: 400, message: 'Footballer not created!', error: 'Bad Request', });
        }
    }
    /***************************************************************************** */
    @Put('/:id')
    async updateFootballer(
        @Res() response,
        @Param('id') FootballerId: string,
        @Body() updateFootballerDto: UpdateFootballerDto,
    ) {
        try {
            const existingFootballer = await this.FootballerService.updateFootballer(
                FootballerId,
                updateFootballerDto,
            );
            return response.status(HttpStatus.OK).json({
                message: 'Footballer has been successfully updated',
                existingFootballer,
            });
        } catch (err:any) {
            return response.status(err.status).json(err.response);
        }
    }
    /***************************************************************************** */

    @Get()
    async getFootballers(@Res() response) {
        try {
            const FootballerData = await this.FootballerService.getAllFootballers();
            return response.status(HttpStatus.OK).json({
                message: 'All Footballers data found successfully',
                FootballerData,
            });
        } catch (err:any) {
            return response.status(err.status).json(err.response);
        }
    }
    /***************************************************************************** */

    @Get('/:id')
    async getFootballer(@Res() response, @Param('id') FootballerId: string) {
        try {
            const existingFootballer = await this.FootballerService.getFootballer(FootballerId);
            return response.status(HttpStatus.OK).json({
                message: 'Footballer found successfully',
                existingFootballer,
            });
        } catch (err:any) {
            return response.status(err.status).json(err.response);
        }
    }
    /***************************************************************************** */

    @Delete('/:id')
    async deleteFootballer(@Res() response, @Param('id') FootballerId: string) {
        try {
            const deletedFootballer = await this.FootballerService.deleteFootballer(FootballerId);
            return response.status(HttpStatus.OK).json({
                message: 'Footballer deleted successfully',
                deletedFootballer,
            });
        } catch (err:any) {
            return response.status(err.status).json(err.response);
        }
    }
    /***************************************************************************** */

    @Sse('/sse_endpoint23')
    sse23(): Observable<MessageEvent> {             // NOT __ WORKING
        console.log("rchd endpoint");
        return interval(1000).pipe(
            map((_) => ({ data: { hello: 'world' } }) as MessageEvent),
        );
    }

    /***************************************************************************** */

}
