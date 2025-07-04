import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelsUsers, UserSchema } from './schemas/users.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports:[
    MongooseModule.forFeature([ {name:ModelsUsers.name, schema:UserSchema} ])
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports:[
    UsersService,
    MongooseModule,
  ],
})
export class UsersModule {};