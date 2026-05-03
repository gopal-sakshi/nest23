import { Observable } from 'rxjs';

export namespace learn_grpc23 {
    
    export interface GetRequest {
        id: string;
    }

    export interface GetResponse {
        id: string;
        name: string;
        description: string;
    }

    export interface IndexServiceClient {
        getData(data: GetRequest): Observable<GetResponse>;
    }
}
