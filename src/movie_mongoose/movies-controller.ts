import { Controller, Get, Post, Body } from '@nestjs/common';
import { Movie } from './movies-interface';
import { MoviesService } from './movies-service';
import { CreateMovieDto } from './movies-dto';

@Controller('movies23')
export class Movies23Controller {

    constructor(private readonly movieService: MoviesService) { }

    @Post()
    async create(@Body() createMovieDto: CreateMovieDto) {
        return this.movieService.create(createMovieDto);
    }

    @Get()
    async findAll(): Promise<Movie[]> {
        return this.movieService.findAll();
    }
}
