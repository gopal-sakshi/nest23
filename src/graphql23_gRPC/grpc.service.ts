import { learn_grpc23 } from '@app/graphql23_gRPC_generated';
import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';


@Injectable()
export class GrpcService implements OnModuleInit {

    private indexService: learn_grpc23.IndexServiceClient;

    constructor(
        @Inject('INDEX_PACKAGE')
        private client: ClientGrpc
    ) { }

    onModuleInit() {
        this.indexService = this.client.getService<learn_grpc23.IndexServiceClient>('IndexService');
    }

    async getRemoteData(id: string) {
        return this.indexService.getData({ id });
    }
}