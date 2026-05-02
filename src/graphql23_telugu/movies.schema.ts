import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'cinemalu23 '})
export class Movie extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  director: string;

  @Prop()
  releaseYear: number;

  @Prop()
  language: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);