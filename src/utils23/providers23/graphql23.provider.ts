import { Provider } from "@nestjs/common";
import { GraphQLClient } from "graphql-request";

export const GraphqlClientProvider23: Provider = {
    provide: GraphQLClient,
    useFactory: () => {
        const graphQlEndpoint23 = process.env.GRAPHQL_ENDPOINT23;
        if(!graphQlEndpoint23) {
            console.error('env variable -- graphQlEndpoint23 doesnt exist');
            return null;
        }
        return new GraphQLClient(graphQlEndpoint23)
    }
}