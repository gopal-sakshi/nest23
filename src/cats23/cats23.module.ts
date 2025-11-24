// cats23.module.ts
import { Module } from '@nestjs/common';
import { Cats23Controller } from './cats23.controller';

@Module({
    imports: [
    ],
    controllers: [
        Cats23Controller
    ],
})
export class Cats23Module { }
