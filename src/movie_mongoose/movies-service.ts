import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Movie } from './movies-interface';
import { CreateMovieDto } from './movies-dto';

@Injectable()
export class MoviesService {
    constructor(@Inject('MOVIE_MODEL') private readonly catModel: Model<Movie>) { }

    async create(createCatDto: CreateMovieDto): Promise<Movie> {
        const createdCat = this.catModel.create(createCatDto);
        return createdCat;
    }

    async findAll(): Promise<Movie[]> {
        return this.catModel.find().exec();
    }
}
