import { Injectable } from '@nestjs/common';

import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AppService {
    welcome(text:string): string {
        console.log(`Entorno ${process.env.NODE_ENV}`)
        return text;
    };
};