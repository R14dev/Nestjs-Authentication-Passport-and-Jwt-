import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database';
import { User, Prisma } from '@prisma/client';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly prismaServices: PrismaService) {}
  async create(user: Prisma.UserCreateInput): Promise<User | undefined> {
    const data: Prisma.UserCreateInput = {
      nome: user.nome,
      username: user.username,
      email: user.email,
      password: await this.hashe(user.password),
      endereco: user.endereco,
    };
    return this.prismaServices.user.create({ data });
  }

  async hashe(password: string): Promise<string> {
    const hashs = await hash(password, 8);
    return hashs;
  }
  async findOneByPk(id: number): Promise<User | undefined> {
    return await this.prismaServices.user.findFirst({
      where: { id: id },
    });
  }
  async findOne(username: string): Promise<User | undefined> {
    return await this.prismaServices.user.findFirst({
      where: {
        username: username,
      },
    });
  }
  async findAll(): Promise<User[]> {
    return await this.prismaServices.user.findMany();
  }
  async update(id: number, data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaServices.user.update({ data, where: { id: id } });
  }
  async delete(id: number): Promise<any | undefined> {
    return await this.prismaServices.user.delete({ where: { id: id } });
  }
}
