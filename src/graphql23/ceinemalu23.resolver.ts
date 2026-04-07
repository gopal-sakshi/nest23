import { Resolver, Query, Args } from '@nestjs/graphql';
import { Cinema } from './cinemalu23.model';

@Resolver(of => Cinema)
export class Cinemalu23Resolver {

    constructor(private readonly usersService) { }

    @Query(returns => [Cinema])
    async anni_cinemalu() {
        return [];
    }
}
