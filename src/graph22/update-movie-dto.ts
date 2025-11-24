import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateMovieInput } from "./create-movie-dto";

@InputType()
export class UpdateMovieInput extends PartialType(CreateMovieInput) {

    @Field((type) => Int)
    id: number;
}