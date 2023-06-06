import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly UserServices: UserService) {}
  @Post('create')
  @HttpCode(HttpStatus.OK)
  create(@Body() data: Prisma.UserCreateInput) {
    return this.UserServices.create(data);
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') Id: number) {
    return this.UserServices.findOneByPk(Id);
  }
  @Get('/all/user')
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<User[]> {
    return this.UserServices.findAll();
  }
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  delete(@Param('id') Id: number) {
    return this.UserServices.delete(Id);
  }
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id') Id: number, @Body() data: Prisma.UserCreateInput) {
    return this.UserServices.update(Id, data);
  }
}
