import { Module } from '@nestjs/common';
import * as mongoose from 'mongoose';

export const movies23Providers = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (): Promise<typeof mongoose> =>
            await mongoose.connect('mongodb://localhost:27017/nestJS_db23'),
    },
];

@Module({
    providers: [...movies23Providers],
    exports: [...movies23Providers],
})
export class MoviesDatabaseModule { }


