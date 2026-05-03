import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MoviesModule } from '@app/graphql23_telugu/movies.module';
import { GrpcModule } from '@app/graphql23_gRPC/gRPCModule23';

@Module({
    imports: [
        MoviesModule,
        GrpcModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,      
            typePaths: ['./**/*.graphql'], 
            definitions: {
                path: join(process.cwd(), 'src/graphql23/cinemalu23.graphql.ts'),
                outputAs: 'class',
            },
            playground: true, 
        }),
    ],
})
export class Cinemalu23Module { }
