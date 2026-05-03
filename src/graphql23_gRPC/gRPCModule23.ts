import { Module } from '@nestjs/common';
import { ClientOptions, ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GrpcService } from './grpc.service';
import { GrpcResolver } from './grpc.resolver';

const gRPCClientOptions: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        package: 'index', 
        protoPath: join(process.cwd(), 'src/graphql23_gRPC_generated/index.proto'),
        url: 'localhost:50051',     // see gRPC23 repo -- test13 folder
        loader: { keepCase: false, oneofs: true, arrays: true, defaults: true }
    }
}

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INDEX_PACKAGE',
        ...gRPCClientOptions
      },
    ]),
  ],
  providers: [GrpcService, GrpcResolver],
  exports: [GrpcService],
})
export class GrpcModule {}