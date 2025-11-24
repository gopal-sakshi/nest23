import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { MovieService } from "./movie-service";
import { MovieModel } from "./movie-model";
import { CreateMovieInput } from "./create-movie-dto";
import { UpdateMovieInput } from "./update-movie-dto";

@Resolver()
export class MovieResolver {

    constructor(private readonly movieService: MovieService) { }

    @Query(() => [MovieModel])
    async movies() {
        return this.movieService.findAll();
    }

    @Query(() => MovieModel)
    async movieById(@Args("id", { type: () => Int }) id: number) {
        return this.movieService.findOne(id);
    }

    @Mutation(() => MovieModel)
    async createMovie(
        @Args("createMovieInput") createMovieInput: CreateMovieInput
    ) {
        return this.movieService.create(createMovieInput);
    }

    @Mutation(() => MovieModel)
    async updateMovie(
        @Args("updateMovieInput") updateMovieInput: UpdateMovieInput
    ) {
        return this.movieService.update(updateMovieInput);
    }

    @Mutation(() => MovieModel)
    async removeMovie(@Args("id", { type: () => Int }) id: number) {
        return this.movieService.remove(id);
    }
}