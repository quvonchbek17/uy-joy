import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '@entities';
import { FilesService } from 'modules/files/files.service';

@Module({
  imports:[
    JwtModule,
    TypeOrmModule.forFeature([Category])
  ],
  controllers: [CategoryController],
  providers: [CategoryService, FilesService],
})
export class CategoryModule {}
