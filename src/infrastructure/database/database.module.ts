import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataBaseConfig from '../../config/database/database.config';

@Module({
    imports:[
        ConfigModule.forFeature(dataBaseConfig),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (ConfigService:ConfigService) => ({
                ...ConfigService.get('database'),
                autoLoadEntities: true,
                synchronize: false,
            }),
        }),
    ],
})
export class ConexionDB{};