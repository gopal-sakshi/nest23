import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Movie } from './movies-interface';
import { CreateMovieDto } from './movies-dto';
import { Dynamo23MoviesRepo } from '@app/utils23/providers23/dynamo23.Movies.repository';
import { GraphQLClient, gql } from 'graphql-request';
import { NotificationService } from './notification-service';

@Injectable()
export class MoviesService {
    constructor(
        @Inject('MOVIE_MODEL') private readonly catModel: Model<Movie>,
        private readonly dynamoMovieTable: Dynamo23MoviesRepo,
        private readonly graphqlClient: GraphQLClient,
        private notService: NotificationService,
    ) { }

    async create(createCatDto: CreateMovieDto): Promise<Movie> {
        const createdCat = this.catModel.create(createCatDto);
        return createdCat;
    }

    async findAll(): Promise<Movie[]> {
        return this.catModel.find().exec();
    }

    async getMovieByTitleFromDynamo(titleName:string) {
        return this.dynamoMovieTable.get2013MovieByTitle(titleName);
    }

    async getInfoFromGraphQL11() {
        const query23 = gql`
            query {
                greetings
                namaste24 {name stadium manager }
                student(firstName12: "Gopal") { firstName, lastName, gender }
            }
        `;
        return this.graphqlClient.request(
            query23,
            undefined,              // no variables needed for this query
            { auth23: 'admin44' }
        );
    }

    async getInfoFromGraphQL12(modatiPeru:string, chivaruPeru:string) {
        const query23 = gql`
            mutation EdoUttiePlaceHolderLaa__CreateStudent($first_name23: String!, $last_name23: String!) {
                create (firstName:$first_name23, lastName:$last_name23, gender:MALE,  subjects: []) { 
                    firstName, 
                    lastName 
                }
            }
        `;
        const mutationPayload23 = {
            first_name23: modatiPeru,
            last_name23: chivaruPeru
        }
        return this.graphqlClient.request(query23, mutationPayload23, { auth23: 'admin44' });
    }

    async createNotificationForMovie(movieId:string, templateName: string, movieData:any) {        
        return this.notService.createNotification(movieId, templateName, movieData);
    }
}
