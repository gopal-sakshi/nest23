import { Mongoose } from 'mongoose';
import { MovieSchema } from './movies-schema';
import { getModelToken } from '@nestjs/mongoose';
import { Notification23, NotificationSchema } from './notification-schema';

export const movies55Providers = [
    {
        provide: 'MOVIE_MODEL',
        useFactory: (mongoose: Mongoose) => mongoose.model('Movies24', MovieSchema),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        // This generates the exact token string @InjectModel(Notification23.name) looks for
        provide: getModelToken(Notification23.name), 
        useFactory: (mongoose: any) => mongoose.model('Notification23', NotificationSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
