import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as Handlebars from 'handlebars';
import { Notification23 } from './notification-schema';


@Injectable()
export class NotificationService {
    constructor(
        @InjectModel(Notification23.name) private notificationModel: Model<Notification23>,
    ) { }

    async createNotification(movieId: string, templateName: string, movieData: any) {

        const rawTemplates = {
            english: {
                title: '🎬 {{movieName}} is now streaming!',
                body: 'Get ready! {{movieName}} has finally released. Watch it now in {{theatersCount}}+ theaters and streaming platforms near you on {{releaseDate}}.',
            },
            tamil: {
                title: '🎬 {{movieName}} இப்போது திரையரங்குகளில்!',
                body: 'தயாராகுங்கள்! ஒருவழியாக {{movieName}} {{theatersCount}}+ திரையரங்குகளில் {{releaseDate}} முதல் கண்டு மகிழுங்கள்.',
            },
            telugu: {
                title: '🎬 {{movieName}} ఇప్పుడు థియేటర్లలో!',
                body: 'సిద్ధంగా ఉండండి! ఎట్టకేలకు {{movieName}} విడుదలయింది. మీ సమీపంలోని {{theatersCount}}+ థియేటర్లలో {{releaseDate}} నుండి వీక్షించండి.',
            },
        };

        const compiledLocales = {
            english: {
                title: Handlebars.compile(rawTemplates.english.title)(movieData),
                body: Handlebars.compile(rawTemplates.english.body)(movieData),
            },
            tamil: {
                title: Handlebars.compile(rawTemplates.tamil.title)(movieData),
                body: Handlebars.compile(rawTemplates.tamil.body)(movieData),
            },
            telugu: {
                title: Handlebars.compile(rawTemplates.telugu.title)(movieData),
                body: Handlebars.compile(rawTemplates.telugu.body)(movieData),
            },
        };

        const newNotification = new this.notificationModel({
            movieId: new Types.ObjectId(movieId),
            templateName,
            locales: compiledLocales,
        });

        return await newNotification.save();
    }
}