import { Module } from "@nestjs/common";
import { Job23Service } from "./job23.service";

@Module({
    providers: [Job23Service],
})
export class Job23Module { }