import { Injectable, NotFoundException, Body, BadRequestException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Login } from './dto/login.dto';
import { User } from '@entities';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly users: Repository<User>,
        private readonly JwtService: JwtService
    ) {}

    async login(@Body() body: Login){

        const user = await this.users.findOne({
            where: {
                phone: body.phone,
                password: body.password
            }
        })

        if(user) {
            const token = this.sign(user.id)
            return {
                success: true,
                status: HttpStatus.OK,
                message: "user mavjud",
                token: token
            }

        } else {
            throw new NotFoundException({message: "User topilmadi", status: 404})
        }
    }


    sign(payload: string) {
        return this.JwtService.sign(payload, {
            secret: process.env.SECRET_KEY
        })
    }

    verify(payload: string) {
        try {
          return this.JwtService.verify(payload, {
            secret: process.env.SECRET_KEY
          });
        } catch(err) {
          throw new BadRequestException({message: "Tokenda muammo bor", status: 400});
        }
      }

    async validateUser(id: string){
        const user = await this.users.findOne({
            where: {
                id
            }
        })

        if(!user) {
            throw new NotFoundException({message: "user topilmadi", status: 404})
        } else {
          return user
        }

    }
}
