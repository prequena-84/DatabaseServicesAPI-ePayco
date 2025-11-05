import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelsUsers, UserSchema } from './domain/users.entity';
import { UsersService } from './infrastructure/repositories/users.repositories';
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