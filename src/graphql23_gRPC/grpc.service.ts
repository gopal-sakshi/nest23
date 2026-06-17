import { learn_grpc23 } from '@app/graphql23_gRPC_generated';
import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import * as grpc from '@grpc/grpc-js'; // Import the native grpc package

@Injectable()
export class GrpcService implements OnModuleInit {

    private indexService: learn_grpc23.IndexServiceClient;
    private sportsService: learn_grpc23.SportsService23Client;

    constructor(
        @Inject('INDEX_PACKAGE')
        private client: ClientGrpc
    ) { }

    onModuleInit() {
        this.indexService = this.client.getService<learn_grpc23.IndexServiceClient>('IndexService');
        this.sportsService = this.client.getService<learn_grpc23.SportsService23Client>('SportsService23');
    }

    async getRemoteData(id: string) {
        return this.indexService.getData({ id });
    }

    // deadlineReq11 == 2 seconds kante ekkuva aithe, request phattu... so, postman lo 10 sec ivvu...
    async getChessData(desamuVar: string, deadlineReq11:number) {
        const metadata = new grpc.Metadata();               // 1. Create gRPC metadata
        metadata.add('correlation-id', 'unique-uuid-12345');
        const deadline = new Date(); 
        deadline.setSeconds(deadline.getSeconds() + Number(deadlineReq11));    // 2. Set a deadline (e.g., 2 seconds from now)
        try {                               // 3. Pass metadata and deadline options to the gRPC call
            const resp45 = await firstValueFrom(
                this.sportsService.getChessPlayers(
                    { desamu: desamuVar },
                    metadata,
                    { deadline }
                )
            );
            return resp45;
        } catch (error:any) {
            console.error('gRPC Call Failed:', error.message);
            throw error;
        }
    }
}
