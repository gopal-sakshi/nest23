import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { Address23, positionEnum23 } from 'src/z_schema/footballer.schema';

// name, position, age, previousClubs, addresses

export class CreateFootballerDto {
    
    @IsString()
    @MaxLength(30)
    @MinLength(3)
    @IsNotEmpty()
    readonly name: string;

    @IsEnum(positionEnum23, { message: 'Invalid position provided.' })
    position: positionEnum23;

    @IsNumber()
    readonly age: number;
    
    @IsArray()
    previousClubs: string[];

    addresses: Address23[]
}
