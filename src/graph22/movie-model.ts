import { Field, ObjectType, Int, Float } from "@nestjs/graphql";

@ObjectType()
export class MovieModel {

    @Field(() => Int)
    id: number;

    @Field()
    title: string;

    @Field()
    description: string;

    @Field(() => Int)
    year: number;

    @Field(() => Float)
    rating: number;
}