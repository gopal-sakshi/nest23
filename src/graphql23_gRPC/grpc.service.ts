import { learn_grpc23 } from '@app/graphql23_gRPC_generated';
import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';


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
        const resp23 = await this.getChessData('USA');
        console.log("resp23 === ", resp23);
        return this.indexService.getData({ id });
    }

    async getChessData(desamuVar: string) {
        return firstValueFrom(this.sportsService.getChessPlayers({desamu:desamuVar}));
    }
}
