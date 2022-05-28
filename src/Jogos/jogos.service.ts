import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJogosDto } from './dto/create-jogos.dto';
import { UpdateJogosDto } from './dto/update-jogos.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Jogos } from './entities/jogos.entity';
import { contains } from 'class-validator';

@Injectable()
export class JogosService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.jogos.findMany();
  }

  async findbyId(id: string): Promise<Jogos> {
      const record = await this.prisma.jogos.findUnique({ where: { id } });
  
      if (!record) {
        throw new NotFoundException(`Registro com o '${id}' não encontrado.`);
      }
  
      return record;
  }

  async findOne(id: string): Promise<Jogos> {
    return this.findbyId(id);
  }

  // async findbyGender(gender: string): Promise<Jogos> {

  //   const record = await this.prisma.jogos.findUnique({ where:   });
  // }

  handleError(error: Error) {
    console.log(error.message);

    return undefined;
  }

  create(dto: CreateJogosDto): Promise<Jogos> {
    const data: Jogos = { ...dto };

    return this.prisma.jogos.create({data}).catch(this.handleError)
  }

  async update(id: string, dto: UpdateJogosDto): Promise<Jogos> {
    await this.findbyId(id);

    const data: Partial<Jogos> = { ...dto };

    return this.prisma.jogos.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await this.findbyId(id);

    await this.prisma.jogos.delete({ where: { id } });
  }
}

