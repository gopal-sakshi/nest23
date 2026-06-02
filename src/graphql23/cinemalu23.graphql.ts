
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Movie {
    _id: string;
    title: string;
    releaseYear?: Nullable<number>;
    director?: Nullable<string>;
}

export class GRPCMovie {
    id?: Nullable<string>;
    name?: Nullable<string>;
    description?: Nullable<string>;
}

export abstract class IQuery {
    abstract getMovies(): Movie[] | Promise<Movie[]>;

    abstract getMovieById(_id: string): Nullable<Movie> | Promise<Nullable<Movie>>;

    abstract getGrpcData(id: string): Nullable<GRPCMovie> | Promise<Nullable<GRPCMovie>>;
}

export abstract class IMutation {
    abstract createMovie(title: string, director: string, releaseYear: number): Movie | Promise<Movie>;

    abstract createMovieWithPubSub(title: string, director: string, releaseYear: number): Movie | Promise<Movie>;
}

export abstract class ISubscription {
    abstract movieAdded(): Nullable<Movie> | Promise<Nullable<Movie>>;
}

type Nullable<T> = T | null;
