import { Controller, Get, Post, Body } from '@nestjs/common';
import { Movie } from './movies-interface';
import { MoviesService } from './movies-service';
import { CreateMovieDto } from './movies-dto';
import { TraceSpan23 } from '@app/utils23/others24/trace-span23';

@Controller('movies23')
export class Movies23Controller {

    constructor(private readonly movieService: MoviesService) { }

    @Post()
    @TraceSpan23('custom-name-babai23')
    async create(@Body() createMovieDto: CreateMovieDto) {
        return this.movieService.create(createMovieDto);
    }

    @Get()
    async findAll(): Promise<Movie[]> {
        return this.movieService.findAll();
    }
}
