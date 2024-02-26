import { Module } from '@nestjs/common';
import { CategoryPropertyService } from './category-property.service';
import { CategoryPropertyController } from './category-property.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, CategoryProperty } from '@entities';

@Module({
  imports: [
    JwtModule,
    TypeOrmModule.forFeature([CategoryProperty, Category])
  ],
  controllers: [CategoryPropertyController],
  providers: [CategoryPropertyService],
})
export class CategoryPropertyModule {}
