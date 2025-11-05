import { registerAs } from "@nestjs/config";

import * as dotenv from 'dotenv';
dotenv.config();

export default registerAs('database', () => ({
    type: 'mysql',
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt( process.env.DB_PORT ?? '3306', 10),
    username: process.env.DB_USER ?? 'userdev',
    password: process.env.DB_PASSWORD ?? 'dev1234',
    database: process.env.DB_DATABASE ?? 'db_system_development_ePayco',
}));