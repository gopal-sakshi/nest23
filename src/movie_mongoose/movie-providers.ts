import { Mongoose } from 'mongoose';
import { MovieSchema } from './movies-schema';

export const movies55Providers = [
  {
    provide: 'MOVIE_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Movies24', MovieSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
