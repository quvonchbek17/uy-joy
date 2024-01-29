import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateResidenceDto } from './dto/create-residence.dto';
import { UpdateResidenceDto } from './dto/update-residence.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, Residence, User } from '@entities';
import { Repository } from 'typeorm';

@Injectable()
export class ResidenceService {
  constructor(
    @InjectRepository(Residence)
    private readonly residenceRepo: Repository<Residence>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(body: CreateResidenceDto, userId: string) {
    try {
      let user = await this.userRepo.findOne({where: {id: userId}})
      let resCategories = await Promise.all(
        body.categories.map(async (el) => await this.categoryRepo.findOne({ where: { id: el } }))
      );

      delete body.categories
      let residence = this.residenceRepo.create({...body, categories:resCategories});
      residence.user = user
      await residence.save();
      delete residence.user.password
      return {
        message: "Yaratildi",
        status: HttpStatus.CREATED,
        data: residence
      };
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  async findAll() {
    let residences = await this.residenceRepo.find({relations:{ categories:true, user: true }})
    residences = residences.map(el => {
      delete el?.user?.password;
      delete el?.user?.created_at
      delete el?.user?.updated_at
      return el
    })
    return {
      status: HttpStatus.OK,
      data: residences
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} residence`;
  }

  update(id: number, updateResidenceDto: UpdateResidenceDto) {
    return `This action updates a #${id} residence`;
  }

  remove(id: number) {
    return `This action removes a #${id} residence`;
  }
}
