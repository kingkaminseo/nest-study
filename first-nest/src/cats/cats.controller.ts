import { CatsService } from './cats.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCatDto } from './CreateCatDto';
import { Cat } from './cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catService: CatsService) {}

  @Get()
  findAll(): Cat[] {
    return this.catService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This actions returns a #s{id} cat`;
  }

  @Post()
  create(@Body() CreateCatDto: CreateCatDto) {
    return this.catService.create(CreateCatDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() CreateCatDto: CreateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
