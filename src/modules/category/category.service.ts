import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '@entities';
import { Repository } from 'typeorm';
import { FilesService } from 'modules/files/files.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    private readonly filesService: FilesService,
  ) {}

  async create(body: CreateCategoryDto, file: Express.Multer.File) {
    let isDuplicate = await this.categoryRepo.findOne({
      where: { name: body.name },
    });
    if (isDuplicate) {
      return new ConflictException("Bu kategoriya avval qo'shilgan");
    }
    let filename = '';
    if (file) {
      filename = await this.filesService.saveFile(file, 'images');
    } else {
      return new HttpException(
        'Rasm yuklanishi majburiy',
        HttpStatus.BAD_REQUEST,
      );
    }
    let category = this.categoryRepo.create({ ...body, img: filename });
    await category.save();
    return {
      status: HttpStatus.CREATED,
      message: 'Yaratildi',
      data: category,
    };
  }

  async findAll() {
    let categories = await this.categoryRepo.find({
      select: ['id', 'name', 'img'],
    });
    return {
      status: HttpStatus.OK,
      data: categories,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
