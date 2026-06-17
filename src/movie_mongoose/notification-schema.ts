import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ _id: false })
export class TranslatedContent {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    body: string;
}
const TranslatedContentSchema = SchemaFactory.createForClass(TranslatedContent);

@Schema({ timestamps: true })
export class Notification23 extends Document {

    @Prop({ type: Types.ObjectId, ref: 'Movies24', required: true })
    movieId: Types.ObjectId;

    @Prop({ required: true })
    templateName: string;           // 'movie_release', 'trailer_drop'

    @Prop({
        type: {
            english: { type: TranslatedContentSchema },
            tamil: { type: TranslatedContentSchema },
            telugu: { type: TranslatedContentSchema },
        },
        required: true,
    })
    locales: {
        english: TranslatedContent;
        tamil: TranslatedContent;
        telugu: TranslatedContent;
    };
}

export const NotificationSchema = SchemaFactory.createForClass(Notification23);