import { Injectable } from "@nestjs/common";
import { DynamoBaseRepo23 } from "./dynamo23_abstract.repository";
import { STSService } from "./sts23.service";

@Injectable()
export class Dynamo23MoviesRepo extends DynamoBaseRepo23 {
    
    protected tableName: string; 

    constructor(stsService: STSService, tableName: string) {
        super(stsService);
        this.tableName = tableName;
    }

    async get2013MovieByTitle(movieName:string): Promise<any> {
        const key23 = {
            year: { N: "2013" },            // eventhough 2013 is a number, we pass it as string; N indicates that its number
            title: { S: movieName }
        }
        const movieInfo = await this.getItem23(key23);
        return movieInfo;
    }

}