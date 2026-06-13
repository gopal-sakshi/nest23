import { Provider } from '@nestjs/common';
import { STSClient } from '@aws-sdk/client-sts';
import { STSService } from './sts23.service';

import { fromIni } from '@aws-sdk/credential-providers';        // CROSSACCOUNT_ROLE_ARN23 pani cheyyali ante
                                                                    // code is trying to assume a cross-account role
                                                                    // but before it can assume that role
                                                                    // baseline set of creds (to prove who you are) undaali

export const STSProvider: Provider = {
    provide: STSService,
    useFactory: () => {

        // 01 ==== mundu evo oka aws creds ivvakapote, cross account role assume cheskolevu
        const profileName = process.env.AWS_PROFILE23 || 'default'; 
        const region = process.env.AWS_REGION23 || 'us-east-1';
        const stsClient = new STSClient({
            region: region,
            credentials: fromIni({ profile: profileName })
        });

        // 02 ==== already AWS creds env lo unte, idi ivvacchuu... 
        // const stsClient = new STSClient();


        const roleArn = process.env.CROSSACCOUNT_ROLE_ARN23;
        if(!roleArn) {
            return null;
        }

        const stsRepo23 = new STSService(stsClient, roleArn);
        return stsRepo23;
    },
};