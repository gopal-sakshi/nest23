// cats23.module.ts
import { Module } from '@nestjs/common';
import { Cats23Controller } from './cats23.controller';
import { Cats23Service } from './cats23.service';

@Module({
    imports: [
    ],
    controllers: [
        Cats23Controller
    ],
    providers: [Cats23Service],
})
export class Cats23Module { }
