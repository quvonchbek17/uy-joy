import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryPropertyService } from './category-property.service';
import { CreateCategoryPropertyDto } from './dto/create-category-property.dto';
import { UpdateCategoryPropertyDto } from './dto/update-category-property.dto';
import { GetByCategoryIdParamsDto, UpdateParamsDto } from './dto/params.dto';

@Controller('category-property')
export class CategoryPropertyController {
  constructor(private readonly categoryPropertyService: CategoryPropertyService) {}

  @Post("create")
  create(@Body() body: CreateCategoryPropertyDto) {
    return this.categoryPropertyService.create(body);
  }

  @Get("all")
  findAll() {
    return this.categoryPropertyService.findAll();
  }

  @Get(':categoryId')
  findByCategoryId(@Param() params: GetByCategoryIdParamsDto) {
    return this.categoryPropertyService.findByCategoryId(params.categoryId);
  }

  @Patch(':id')
  update(@Param() params: UpdateParamsDto, @Body() body: UpdateCategoryPropertyDto) {
    return this.categoryPropertyService.update(params.id, body);
  }

  @Delete(':id')
  remove(@Param() params: UpdateParamsDto) {
    return this.categoryPropertyService.remove(params.id);
  }
}
