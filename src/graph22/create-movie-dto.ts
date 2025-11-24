import { InputType, Field, Float, Int } from "@nestjs/graphql";

@InputType()
export class CreateMovieInput {
    
    @Field()
    title: string;

    @Field()
    description: string;

    @Field(() => Int)
    year: number;

    @Field(() => Float)
    rating: number;
}