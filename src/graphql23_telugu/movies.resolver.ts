import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '@app/auth/authorization.guard';
import { PubSub } from 'graphql-subscriptions';
import { Movie } from './movies.schema';
import { delay } from 'rxjs/internal/operators/delay';
import { from } from 'rxjs/internal/observable/from';
import { concatMap } from 'rxjs/internal/operators/concatMap';
import { of } from 'rxjs/internal/observable/of';
import { interval } from 'rxjs/internal/observable/interval';
import { take } from 'rxjs/internal/operators/take';

const pubSub = new PubSub();
@Resolver('Movie')
export class MoviesResolver {
    constructor(private readonly moviesService: MoviesService) { }

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

    @UseGuards(AuthorizationGuard)
    @Mutation('createMovieWithPubSub')
    async createMovieWithPubSub(
        @Args('title') title: string,
        @Args('director') director: string,
        @Args('releaseYear') releaseYear: number,
    ) {
        const newMovie = await this.moviesService.create({ title, director, releaseYear });

        // FIX: The key inside the object MUST match your Subscription name in the schema
        pubSub.publish('movieAdded23', { movieAdded: newMovie });

        return newMovie;
    }

    // Matches the name in your .graphql schema file
    @Subscription('movieAdded')
    movieAdded(): AsyncIterator<Movie> {

        // option 01
        let subscription1 = from([1,2,3,4,5]).pipe(
            concatMap((val) => of(val).pipe(delay(1000)))
        );

        // option 02
        let subscription2 = interval(1000).pipe(take(5))

        let activeStream$ = subscription2           // or subscription1

        let subscription = activeStream$.subscribe({
            next: (resp) => { 
                pubSub.publish(`movieAdded23`, { 
                    movieAdded: { _id: `id__no_`, title: '11', director: '12', releaseYear: 2000 } 
                });
            },
            error: (err) => console.error(`stream error`),
            complete: () => {
                console.log("stream completed");
                pubSub.publish(`movieAdded23`, { movieAdded: null });
                if(subscription) {
                    subscription.unsubscribe();
                }
            },
        });    

        // NOT WORKING ------------ LATERRRRRRRRRRRRR
        // let subscription:any;
        // subscription = of(true).subscribe({
        //     next: () => {
        //         pubSub.publish('movieAdded23', {
        //             movieAdded: {
        //                 _id: "handshake",
        //                 title: "Connecting to stream...",
        //                 director: "",
        //                 releaseYear: 0
        //             }
        //         });
        //     }
        // });

        return pubSub.asyncIterableIterator('movieAdded23');
    }
}