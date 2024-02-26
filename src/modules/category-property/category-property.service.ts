import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryPropertyDto } from './dto/create-category-property.dto';
import { UpdateCategoryPropertyDto } from './dto/update-category-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, CategoryProperty } from '@entities';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryPropertyService {
  constructor(
    @InjectRepository(CategoryProperty)
    private readonly propertyRepo: Repository<CategoryProperty>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}
  async create(body: CreateCategoryPropertyDto) {
    try {
      let category = await this.categoryRepo.findOne({
        where: { id: body.categoryId },
      });
      if (!category) {
        return new NotFoundException("Bunday kategoriya yo'q");
      }
      let property = this.propertyRepo.create({ ...body, category });
      await property.save();
      delete property.category.created_at;
      delete property.category.updated_at;
      delete property.category.img;
      delete property.created_at;
      delete property.updated_at;
      return {
        status: HttpStatus.CREATED,
        data: property,
      };
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    let properties = await this.propertyRepo.find({
      select: ['id', 'name', 'type'],
    });
    return {
      status: HttpStatus.OK,
      data: properties,
    };
  }

  async findByCategoryId(id: string) {
    let category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) {
      return new NotFoundException("Bunday kategoriya yo'q");
    }
    let properties = await this.propertyRepo.find({
      where: { category: { id } },
      select: ['id', 'name', 'type'],
    });
    return {
      status: HttpStatus.OK,
      data: properties,
    };
  }

  async update(id: string, body: UpdateCategoryPropertyDto) {
    try {
      let category = null;

      if (body.categoryId) {
        category = await this.categoryRepo.findOne({
          where: { id: body.categoryId },
        });
      }

      if (!category && body.categoryId) {
        return new NotFoundException("Bunday kategoriya yo'q");
      }

      let property = await this.propertyRepo.findOne({ where: { id } });
      if (property) {
        delete body.categoryId;
        await this.propertyRepo.update(id, {
          ...body,
          category: category ? category : property.category,
          updated_at: new Date(),
        });
        return {
          status: HttpStatus.OK,
          data: await this.propertyRepo.findOne({ where: { id } }),
        };
      } else {
        return new NotFoundException("Bunday property yo'q");
      }
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string) {
    try {
      let property = await this.propertyRepo.findOne({ where: { id } });
      if (!property) {
        return new NotFoundException("Bunday property yo'q");
      } else {
        await this.propertyRepo.remove(property);
        return {
          message: "o'chirildi",
          status: HttpStatus.OK,
        };
      }
    } catch (error) {
      return new InternalServerErrorException(error.message)
    }
  }
}
