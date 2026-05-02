import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './movies.schema';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async findAll(): Promise<Movie[]> {
    return this.movieModel.find().exec();
  }

  async findOne(id: string): Promise<Movie | null> {
    return this.movieModel.findById(id).exec();
  }

  async create(data: any): Promise<Movie> {
    const newMovie = new this.movieModel(data);
    return newMovie.save();
  }
}