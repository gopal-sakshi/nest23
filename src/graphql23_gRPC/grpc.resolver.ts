import { Resolver, Query, Args } from '@nestjs/graphql';
import { GrpcService } from './grpc.service';

@Resolver()
export class GrpcResolver {
  constructor(private readonly grpcService: GrpcService) {}

  @Query(() => String, { name: 'getGrpcData' })
  async getGrpcData(@Args('id') id: string) {
    const result = await this.grpcService.getRemoteData(id);
    return result;
  }
}