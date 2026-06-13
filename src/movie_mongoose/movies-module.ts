import { Module } from '@nestjs/common';
import { Movies23Controller } from './movies-controller';
import { MoviesService } from './movies-service';
import { MoviesDatabaseModule } from './movies-database';
import { movies55Providers } from './movie-providers';
import { DynamoDbMovieProvider23 } from '@app/utils23/providers23/dynamo23.Movies.provider';
import { STSProvider } from '@app/utils23/providers23/sts23.provider';
import { GraphqlClientProvider23 } from '@app/utils23/providers23/graphql23.provider';

@Module({
    imports: [MoviesDatabaseModule],
    controllers: [Movies23Controller],
    providers: [
        MoviesService, 
        ...movies55Providers, 
        STSProvider,
        DynamoDbMovieProvider23,
        GraphqlClientProvider23,
    ],
})
export class Movies23Module { }
