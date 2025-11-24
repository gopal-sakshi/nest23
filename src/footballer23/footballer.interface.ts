import { Document } from 'mongoose';
import { Address23, positionEnum23 } from 'src/footballer23/footballer.schema';

export interface IFootballer extends Document {
    readonly name: string;
    readonly position: positionEnum23;
    readonly age: number;
    readonly previousClubs: string[];
    readonly addresses: Address23[];    
}
