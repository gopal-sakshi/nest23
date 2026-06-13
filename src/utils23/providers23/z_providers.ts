import { Provider } from "@nestjs/common";
import { GraphqlClientProvider23 } from "./graphql23.provider";
import { DynamoDbMovieProvider23 } from "./dynamo23.Movies.provider";

export const providers23: Provider[] = [
    GraphqlClientProvider23,
    DynamoDbMovieProvider23
]