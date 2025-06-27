import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

const uriMongoDB = `mongodb+srv://${process.env.USER_MONGODB}:${process.env.KEY_MONGODB}@${process.env.CLOUSTER_OPERATIONS}${process.env.URI_MONGO}${process.env.CLOUSTER_OPERATIONS}`;

@Module({
    imports:[
        MongooseModule.forRoot(uriMongoDB)
    ],
    exports:[MongooseModule],
})
export class ConexionDB {};