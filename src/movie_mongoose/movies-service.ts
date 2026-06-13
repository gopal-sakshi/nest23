import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Movie } from './movies-interface';
import { CreateMovieDto } from './movies-dto';
import { Dynamo23MoviesRepo } from '@app/utils23/providers23/dynamo23.Movies.repository';

@Injectable()
export class MoviesService {
    constructor(
        @Inject('MOVIE_MODEL') private readonly catModel: Model<Movie>,
        private readonly dynamoMovieTable: Dynamo23MoviesRepo,
    ) { }

    async create(createCatDto: CreateMovieDto): Promise<Movie> {
        const createdCat = this.catModel.create(createCatDto);
        return createdCat;
    }

    async findAll(): Promise<Movie[]> {
        return this.catModel.find().exec();
    }

    async getMovieByTitleFromDynamo(titleName:string) {
        return this.dynamoMovieTable.get2013MovieByTitle(titleName);
    }
}
