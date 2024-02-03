import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateResidenceDto } from './dto/create-residence.dto';
import { UpdateResidenceDto } from './dto/update-residence.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, Residence, User } from '@entities';
import { Repository } from 'typeorm';

@Injectable()
export class ResidenceService {
  public readonly selected: string[]

  constructor(
    @InjectRepository(Residence)
    private readonly residenceRepo: Repository<Residence>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {
     this.selected = ['r.id', 'r.description', 'r.created_at', 'r.updated_at', 'u.id', 'u.phone', 'u.name', 'u.surname', "c.id", "c.name", "c.img"]
  }

  async create(body: CreateResidenceDto, userId: string) {
    try {

      let user = await this.userRepo.findOne({where: {id: userId}})
      let resCategories = await Promise.all(
        body?.categories.map(async (el) => await this.categoryRepo.findOne({ where: { id: el } }))
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
    let residences = await this.residenceRepo
    .createQueryBuilder('r')
    .leftJoinAndSelect('r.user', 'u')
    .leftJoinAndSelect('r.categories', 'c')
    .select(this.selected)
    .getMany();
    return {
      status: HttpStatus.OK,
      data: residences
    };
  }

  async pagination(page: number, limit: number){
    let [residences, count] = await this.residenceRepo
     .createQueryBuilder("r")
     .leftJoinAndSelect('r.user', 'u')
     .leftJoinAndSelect('r.categories', 'c')
     .select(this.selected)
     .offset((page - 1) * limit)
     .limit(limit)
     .getManyAndCount()


     return {
      status: HttpStatus.OK,
      currentPage: page,
      currentCount: limit,
      totalCount: count,
      totalPages: Math.ceil(count/limit),
      residences
     }


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
