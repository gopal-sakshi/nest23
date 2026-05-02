import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesResolver } from './movies.resolver';
import { MoviesService } from './movies.service';
import { Movie, MovieSchema } from './movies.schema';
import { AuthorizationGuard } from '@app/auth/authorization.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }])
  ],
  providers: [MoviesResolver, MoviesService, AuthorizationGuard],
  exports: [MoviesService], 
})
export class MoviesModule {}