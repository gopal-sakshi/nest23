import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '@app/auth/authorization.guard';


@Resolver('Movie')
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @UseGuards(AuthorizationGuard)
  @Query('getMovies')
  async findAll() {
    return this.moviesService.findAll();
  }

  @Query('getMovieById')
  async findOne(@Args('id') id: string) {
    return this.moviesService.findOne(id);
  }
  
  @UseGuards(AuthorizationGuard)
  @Mutation('createMovie')
  async create(
    @Args('title') title: string,
    @Args('director') director: string,
    @Args('releaseYear') releaseYear: number,
  ) {
    return this.moviesService.create({ title, director, releaseYear });
  }
}