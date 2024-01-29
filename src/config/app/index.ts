import { registerAs } from "@nestjs/config"
interface AppConfig {
    readonly host: string,
    readonly port: number
}

export const appConfig = registerAs("app", (): AppConfig => ({
    host: String(process.env.APP_HOST) || "127.0.0.1",
    port: Number(process.env.APP_PORT) || 4000
}))