import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateFootballerDto } from 'src/footballer23/create-Footballer.dto';
import { UpdateFootballerDto } from 'src/footballer23/update-Footballer.dto';
import { IFootballer } from 'src/footballer23/footballer.interface';


@Injectable()
export class FootballerService {

    constructor(@InjectModel('Footballer23') private footballerModel: Model<IFootballer>) { }

    /********************************************************************* */
    async createFootballer(createFootballerDto: CreateFootballerDto): Promise<IFootballer> {
        return await new this.footballerModel(createFootballerDto).save();
    }
    /********************************************************************* */
    
    async updateFootballer(
        FootballerId: string,
        updateFootballerDto: UpdateFootballerDto,
    ): Promise<IFootballer> {
        const existingFootballer = await this.footballerModel.findByIdAndUpdate(
            FootballerId,
            updateFootballerDto,
            { new: true },
        );
        if (!existingFootballer) {
            throw new NotFoundException(`Footballer #${FootballerId} not found`);
        }
        return existingFootballer;
    }
    /********************************************************************* */

    async getAllFootballers(): Promise<IFootballer[]> {
        const FootballerData = await this.footballerModel.find();
        if (!FootballerData || FootballerData.length == 0) {
            throw new NotFoundException('Footballers data not found!');
        }
        return FootballerData;
    }
    /********************************************************************* */

    async getFootballer(FootballerId: string): Promise<IFootballer> {
        const existingFootballer = await this.footballerModel.findById(FootballerId).exec();
        if (!existingFootballer) {
            throw new NotFoundException(`Footballer #${FootballerId} not found`);
        }
        return existingFootballer;
    }
    /********************************************************************* */

    async deleteFootballer(FootballerId: string): Promise<IFootballer> {
        const deletedFootballer = await this.footballerModel.findByIdAndDelete(FootballerId);
        if (!deletedFootballer) {
            throw new NotFoundException(`Footballer #${FootballerId} not found`);
        }
        return deletedFootballer;
    }
    /********************************************************************* */

}
