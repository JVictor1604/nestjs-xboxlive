import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Genero } from './entities/genero.entity';
import { handleError } from 'Util/handle-error-util';

@Injectable()
export class GeneroService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.genre.findMany();
  }

  async findbyId(id: string): Promise<Genero> {
    const record = await this.prisma.genre.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com o '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string): Promise<Genero> {
    return this.findbyId(id);
  }

  create(dto: CreateGeneroDto): Promise<Genero> {
    const data: Genero = { ...dto };

    return this.prisma.genre.create({ data }).catch(handleError);
  }

  async update(id: string, dto: UpdateGeneroDto): Promise<Genero> {
    await this.findbyId(id);

    const data: Partial<Genero> = { ...dto };

    return this.prisma.genre.update({
      where: { id },
      data,
    }).catch(handleError);
  }

  async delete(id: string) {
    await this.findbyId(id);

    await this.prisma.genre.delete({ where: { id } });
  }
}