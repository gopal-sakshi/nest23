import { Module } from '@nestjs/common';
import { Cinemalu23Resolver } from './ceinemalu23.resolver';

@Module({
    providers: [Cinemalu23Resolver],
})
export class Cinemalu23Module { }
