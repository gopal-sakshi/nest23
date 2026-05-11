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

    export interface chessPlayersReq11 {
        desamu: string;
    }

    export interface chessPlayer45 {
        id: string;
        name22: string;
        country22: string;
        is_active: boolean;
    }

    export interface chessPlayersResp11 {
        success23: boolean;
        data11: chessPlayer45[];
        totalCount33?: number;
}   
    export interface IndexServiceClient {
        getData(data: GetRequest): Observable<GetResponse>;
    }

    export interface SportsService23Client {
        getChessPlayers (data:chessPlayersReq11): Observable<chessPlayersResp11>;
    }
}
