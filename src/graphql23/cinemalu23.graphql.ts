
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

export class ChessPlayer45Index {
    id?: Nullable<string>;
    name22?: Nullable<string>;
    country22?: Nullable<string>;
    is_active?: Nullable<boolean>;
}

export class ChessPlayersResp11 {
    success23?: Nullable<boolean>;
    data11?: Nullable<Nullable<ChessPlayer45Index>[]>;
    totalCount33?: Nullable<number>;
}

export abstract class IQuery {
    abstract getMovies(): Movie[] | Promise<Movie[]>;

    abstract getMovieById(_id: string): Nullable<Movie> | Promise<Nullable<Movie>>;

    abstract getGrpcData(id: string): Nullable<GRPCMovie> | Promise<Nullable<GRPCMovie>>;

    abstract getChessData(desamu22?: Nullable<string>, deadlineReq11?: Nullable<number>): Nullable<ChessPlayersResp11> | Promise<Nullable<ChessPlayersResp11>>;
}

export abstract class IMutation {
    abstract createMovie(title: string, director: string, releaseYear: number): Movie | Promise<Movie>;

    abstract createMovieWithPubSub(title: string, director: string, releaseYear: number): Movie | Promise<Movie>;
}

export abstract class ISubscription {
    abstract movieAdded(): Nullable<Movie> | Promise<Nullable<Movie>>;
}

type Nullable<T> = T | null;
