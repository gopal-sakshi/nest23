import { Document } from 'mongoose';

export interface Movie extends Document {
    readonly title: string;
    readonly year: number;
}
