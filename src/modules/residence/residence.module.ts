import { Module } from '@nestjs/common';
import { ResidenceService } from './residence.service';
import { ResidenceController } from './residence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Residence, User } from '@entities';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'modules/auth';

@Module({
  imports: [
    JwtModule,
    TypeOrmModule.forFeature([Residence, Category, User])
  ],
  controllers: [ResidenceController],
  providers: [ResidenceService, AuthService],
})
export class ResidenceModule {}
