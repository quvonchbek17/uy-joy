import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, UploadedFiles, HttpException, HttpStatus } from '@nestjs/common';
import {FilesInterceptor, FileInterceptor} from "@nestjs/platform-express"
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { diskStorage } from 'multer';
import { FilesService } from 'modules/files/files.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService,
     ) {

  }

  @Post("create")
  @UseInterceptors(FileInterceptor("img"))
  async create(@Body() body: CreateCategoryDto, @UploadedFile() file: Express.Multer.File) {
    return this.categoryService.create(body, file);
  }

  @Get("all")
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
