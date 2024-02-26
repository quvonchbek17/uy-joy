import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from "@nestjs/jwt"
import { appConfig, databaseConfig, typeOrmAsyncConfig } from '@config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@modules';
import { ResidenceModule } from './modules/residence/residence.module';
import { CategoryModule } from './modules/category/category.module';
import { FilesModule } from './modules/files/files.module';
import { MulterModule } from '@nestjs/platform-express';
import { CategoryPropertyModule } from './modules/category-property/category-property.module';

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
    ResidenceModule,
    CategoryModule,
    FilesModule,
    CategoryPropertyModule
  ]
})
export class AppModule {}
