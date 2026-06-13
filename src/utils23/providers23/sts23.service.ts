import { AssumeRoleCommand, Credentials, GetCallerIdentityCommand, STSClient } from "@aws-sdk/client-sts";
import { Injectable } from "@nestjs/common";

export interface ISTSService23 {
    isValidRole(creds23:Credentials): Promise<boolean>;
    assumeRole(): Promise<Credentials>
}

@Injectable()
export class STSService implements ISTSService23 {
    
    constructor(
        private readonly stsClient: STSClient,
        private readonly roleArn: string
    ) { }

    async isValidRole(creds23: Credentials): Promise<boolean> {
        if(!creds23.AccessKeyId || !creds23.SecretAccessKey || !creds23.SessionToken || !creds23.Expiration) {
            return false;
        }
        const stsAssumeRoleClient = new STSClient({
            credentials: {
                accessKeyId: creds23.AccessKeyId,
                secretAccessKey: creds23.SecretAccessKey,
                sessionToken: creds23.SessionToken,
                expiration: creds23.Expiration
            }
        });

        try {
            await stsAssumeRoleClient.send(new GetCallerIdentityCommand());
            return true;
        } catch (err) {
            console.log("sts role assumption phattu23 == ", err);
            return false
        }
    }

    async assumeRole(): Promise<Credentials> {
        const role = await this.stsClient.send(
            new AssumeRoleCommand({
                RoleArn: this.roleArn,
                RoleSessionName: 'nest23-sts23.service.ts--cross_aws_account23'
            })
        );

        if(role?.Credentials) {
            return role.Credentials
        }

        throw new Error('assume role cheyyalekapoya bhayya23');
    }

}