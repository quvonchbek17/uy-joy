import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ResidenceService } from './residence.service';
import { CreateResidenceDto } from './dto/create-residence.dto';
import { UpdateResidenceDto } from './dto/update-residence.dto';
import { JwtAuthGuard } from 'modules/auth/guards/jwt.auth.guard';
import { Request } from 'express';

@Controller('residence')
export class ResidenceController {
  constructor(private readonly residenceService: ResidenceService) {}

  @UseGuards(JwtAuthGuard)
  @Post("create")
  create(@Body() body: CreateResidenceDto, @Req() req: Request) {
    return this.residenceService.create(body, req.user.id);
  }

  @Get("all")
  findAll() {
    return this.residenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.residenceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResidenceDto: UpdateResidenceDto) {
    return this.residenceService.update(+id, updateResidenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.residenceService.remove(+id);
  }
}
