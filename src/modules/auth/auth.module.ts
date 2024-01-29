import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from '@entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User ]),
    JwtModule.register({
        secret: process.env.SECRET_KEY
    })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
