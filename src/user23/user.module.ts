import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forRoot({
            type: 'postgres',
            database: 'postgres',
            entities: [],
            synchronize: true,
            host: 'db',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            autoLoadEntities: true,
    }),
    ],
    providers: [UserResolver, UserService],
})
export class UserModule { }
