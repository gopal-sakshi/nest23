import { AttributeValue, DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { Injectable } from '@nestjs/common';
import { STSService } from './sts23.service';

@Injectable()
export abstract class DynamoBaseRepo23 {
    
    protected abstract tableName: string;
    protected dynamoClient: DynamoDBClient;

    constructor(
        protected readonly stsService: STSService,
    ) { }

    async getDynamoClient() {
        
        const createDynamoDbClient = async () => {
            const creds24 = await this.stsService.assumeRole();
            if(!creds24.AccessKeyId || !creds24.Expiration || !creds24.SecretAccessKey || !creds24.SessionToken) {
                throw new Error('credentials tappu babai')
            }
            this.dynamoClient = new DynamoDBClient({
                credentials: {
                    accessKeyId: creds24.AccessKeyId,
                    secretAccessKey: creds24.SecretAccessKey,
                    sessionToken: creds24.SessionToken,
                    expiration: creds24.Expiration,
                }
            })
        }

        if(!this.dynamoClient) {
            await createDynamoDbClient();
            return this.dynamoClient;
        }

        const creds25 = await this.dynamoClient.config.credentials();
        const isActiveClient = await this.stsService.isValidRole({
            AccessKeyId: creds25.accessKeyId,
            SecretAccessKey: creds25.secretAccessKey,
            SessionToken: creds25.sessionToken,
            Expiration: creds25.expiration,
        });
        if(!isActiveClient) {
            await createDynamoDbClient();
        }
        return this.dynamoClient;
    }

    async getItem23(key: Record<string|number, AttributeValue>) {
        const client = await this.getDynamoClient();
        const { Item } = await client.send(
            new GetItemCommand({
                TableName: this.tableName,
                Key: key
            })
        )
        if(!Item) {
            return undefined;
        }
        return unmarshall(Item) as unknown
    }

}