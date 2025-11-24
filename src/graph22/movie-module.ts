import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Movie } from "./movie-entity";
import { MovieService } from "./movie-service";
import { MovieResolver } from "./movie-resolver";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";

@Module({
    imports: [
        TypeOrmModule.forFeature([Movie]),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),

        }),
    ],
    providers: [MovieService, MovieResolver],
})
export class MovieModule { }