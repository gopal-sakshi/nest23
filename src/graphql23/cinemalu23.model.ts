import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Cinema {
    @Field(type => Int)
    id;

    @Field()
    name;

    @Field()
    email;
}
