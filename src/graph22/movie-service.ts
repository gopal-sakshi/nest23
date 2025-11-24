import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Movie } from "./movie-entity";
import { CreateMovieInput } from "./create-movie-dto";
import { UpdateMovieInput } from "./update-movie-dto";

@Injectable()
export class MovieService {

    constructor(
        @InjectRepository(Movie)
        private readonly movieRepository: Repository<Movie>
    ) { }

    findAll(): Promise<Movie[]> {
        return this.movieRepository.find();
    }

    async findOne(id: number): Promise<Movie> {
        const movie = await this.movieRepository.findOneBy({ id });

        if (!movie) {
            throw new Error("Movie not found");
        }
        return movie;
    }

    async create(createMovieInput: CreateMovieInput): Promise<Movie> {
        const movie = this.movieRepository.create(createMovieInput);
        return this.movieRepository.save(movie);
    }

    async update(updateMovieInput: UpdateMovieInput): Promise<Movie> {
        const movie = await this.movieRepository.findOneBy({
            id: updateMovieInput.id,
        });
        if (!movie) {
            throw new Error("Movie not found");
        }

        if (updateMovieInput.title) movie.title = updateMovieInput.title;
        if (updateMovieInput.description)
            movie.description = updateMovieInput.description;
        if (updateMovieInput.year) movie.year = updateMovieInput.year;
        if (updateMovieInput.rating !== undefined)
            movie.rating = updateMovieInput.rating;

        return this.movieRepository.save(movie);
    }

    async remove(id: number) {
        const movie = await this.movieRepository.findOneBy({ id });

        if (!movie) {
            throw new Error("Movie not found");
        }

        await this.movieRepository.delete(id);
        return movie;
    }
}
