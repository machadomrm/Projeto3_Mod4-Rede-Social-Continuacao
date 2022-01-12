/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(info: CreateCategoriaDto): Promise<Categoria> {
    return await this.prisma.categoria.create({ data: info });
  }

  async findAll(): Promise<Categoria[]> {
    return await this.prisma.categoria.findMany();
  }

  async findOne(id: number): Promise<Categoria> {
    return await this.prisma.categoria.findUnique({ where: { id } });
  }

  async update(id: number, info: UpdateCategoriaDto): Promise<Categoria> {
    return await this.prisma.categoria.update({ where: { id }, data: info });
  }

  async remove(id: number): Promise<Categoria> {
    return await this.prisma.seguidores.delete({ where: { id } });
  }
}
