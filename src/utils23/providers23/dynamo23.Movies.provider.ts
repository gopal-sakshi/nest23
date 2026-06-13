import { Provider } from "@nestjs/common";
import { Dynamo23MoviesRepo } from "./dynamo23.Movies.repository";
import { STSService } from "./sts23.service";

export const DynamoDbMovieProvider23: Provider = {
    provide: Dynamo23MoviesRepo,
    inject: [STSService],
    useFactory: (stsService: STSService) => {
        const tableName = 'Movies';
        const dynamoMoviesRepo23 = new Dynamo23MoviesRepo(stsService, tableName);
        return dynamoMoviesRepo23;
    }
}