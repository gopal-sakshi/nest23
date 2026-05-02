
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

export abstract class IQuery {
    abstract getMovies(): Movie[] | Promise<Movie[]>;

    abstract getMovieById(_id: string): Nullable<Movie> | Promise<Nullable<Movie>>;
}

export abstract class IMutation {
    abstract createMovie(title: string, director: string, releaseYear: number): Movie | Promise<Movie>;
}

type Nullable<T> = T | null;
