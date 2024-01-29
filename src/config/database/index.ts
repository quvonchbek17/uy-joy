import { registerAs } from "@nestjs/config"
interface DatabaseConfig {
    readonly host: string,
    readonly port: number,
    readonly username: string,
    readonly password: string,
    readonly database: string
}

export const databaseConfig = registerAs("database", (): DatabaseConfig => ({
    host: String(process.env.DB_HOST) || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 5432,
    username: String(process.env.DB_USERNAME) || "postgres",
    password: String(process.env.DB_PASSWORD) || "1111",
    database: String(process.env.DB_NAME) || "uyjoy"
}))