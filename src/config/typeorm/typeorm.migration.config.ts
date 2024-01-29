import { DataSource } from 'typeorm'
import * as dotenv from "dotenv"
dotenv.config()

export const DataBaseSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    entities: [__dirname + '/../../entities/*.entity.{js,ts}'],
    migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
    logging: true,
    synchronize: false
})