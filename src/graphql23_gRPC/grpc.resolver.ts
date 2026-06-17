import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { GrpcService } from './grpc.service';

@Resolver()
export class GrpcResolver {
    constructor(private readonly grpcService: GrpcService) { }

    @Query(() => String, { name: 'getGrpcData' })
    async getGrpcData(@Args('id') id: string) {
        const result = await this.grpcService.getRemoteData(id);
        return result;
    }

    @Query(() => String, { name: 'getChessData' })
    async getChessData(
        @Args('desamu22') desamu22: string,
        @Args('deadlineReq11', { type: () => Int, nullable: true }) deadlineReq11: number 
    ) {
        const result = await this.grpcService.getChessData(desamu22, deadlineReq11)
        return result;
    }
}