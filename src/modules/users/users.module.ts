import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './domain/users.entity';
import { UsersRepository } from './infrastructure/repositories/users.repositories';
import { UsersController } from './interfaces/controllers/users.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([UsersEntity]),
  ],
  providers: [UsersRepository],
  controllers: [UsersController],
  exports:[
    TypeOrmModule,
    UsersRepository,
  ],
})
export class UsersModule {};