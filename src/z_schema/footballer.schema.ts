import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum positionEnum23 {
    STRIKER = 'striker',
    MIDFIELD = 'midfield',
    DEFENDER = 'defender',
    GOALKEEPER = 'goalkeeper'
}
/* ****************************************************************************** */
@Schema()
export class Address23 {

    @Prop()
    street: string;

    @Prop()
    city: string;
}
export const AddressSchema23 = SchemaFactory.createForClass(Address23);
/* ****************************************************************************** */

@Schema()
export class Footballer {
    
    @Prop({ required: true })
    name: string;

    @Prop({ type: String, enum: positionEnum23, default: positionEnum23.MIDFIELD })
    position: positionEnum23;

    @Prop()
    age: number;

    @Prop([String])
    previousClubs: string[];

    @Prop({ type: [AddressSchema23]})           // array of addresses
    addresses: Address23[]

}
export const FootballerSchema = SchemaFactory.createForClass(Footballer);
