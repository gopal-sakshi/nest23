import { Module } from '@nestjs/common';
import { Movies23Controller } from './movies-controller';
import { MoviesService } from './movies-service';
import { MoviesDatabaseModule } from './movies-database';
import { movies55Providers } from './movie-providers';

@Module({
    imports: [MoviesDatabaseModule],
    controllers: [Movies23Controller],
    providers: [MoviesService, ...movies55Providers],
})
export class Movies23Module { }
