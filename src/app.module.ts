import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from "@nestjs/jwt"
import { appConfig, databaseConfig, typeOrmAsyncConfig } from '@config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@modules';
import { ResidenceModule } from './modules/residence/residence.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig]
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    AuthModule,
    ResidenceModule
  ]
})
export class AppModule {}
