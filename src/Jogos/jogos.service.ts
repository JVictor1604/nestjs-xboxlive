import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { handleError } from 'Util/handle-error-util';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJogosDto } from './dto/create-jogos.dto';
import { UpdateJogosDto } from './dto/update-jogos.dto';

@Injectable()
export class JogosService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.jogos.findMany({
      select:

       { id: true, 
         title: true, 
         gameplayYouTubeUrl: true, 
         genres: { select: { genre: { select: { gender: true } } } },
      },
    });
  }

  async findbyId(id: string) {
    const record = await this.prisma.jogos.findUnique({ where: { id }, include: {
      genres: { select: { genre: { select: { gender: true } } } },
    }});

    if (!record) {
      throw new NotFoundException(`Registro com o '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string) {
    return this.findbyId(id);
  }

  create(dto: CreateJogosDto) {
    const data: Prisma.JogosCreateInput = {
      ...dto,
      genres: {
        createMany: {
          data: dto.genres.map((genreid) => ({ genreId: genreid })),
        },
      },
    };

    return this.prisma.jogos
      .create({
        data,
        include: {
          genres: { select: { genre: { select: { gender: true } } } },
        },
      })
      .catch(handleError);
  }

  async update(id: string, dto: UpdateJogosDto) {
    await this.findbyId(id);

    const data: Partial<Prisma.JogosCreateInput> = {
      ...dto,
      genres: {
        createMany: {
          data: dto.genres.map((genreid) => ({ genreId: genreid })),
        },
      },
    };

    return this.prisma.jogos
      .update({
        where: { id },
        data,
        include: {
          genres: { select: { genre: { select: { gender: true } } } },
        },
      })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findbyId(id);

    await this.prisma.jogos.delete({ where: { id } });
  }
}
