import { Retry23 } from '@app/utils23/others24/retry-decorator23';
import { Injectable, NotFoundException } from '@nestjs/common';
import { retry } from 'rxjs';

@Injectable()
export class Cats23Service {

    constructor() { }

    @Retry23({maxAttempts:3})
    async getCatsWithRetry() {
        console.log('--- getCatsWithRetry() invoked ---');
        const cats = await this.fetchFromFlakyApi();
        console.log('Success! Fetched cats:', cats);
        return cats;        
    }

    private async fetchFromFlakyApi() {
        const rollTheDice = Math.random();
        console.log("rollTheDice ========> ", rollTheDice);
        if (rollTheDice < 0.65) {           // 65% chance to fail, 35% chance to pass
            throw new Error(`Database connection timeout!`, );
        } else {
            return ['Garfield', 'Tom&Jerry', 'Sylvester'];
        }
    }

}
