import { Injectable } from '@nestjs/common';
import { CreateJogosDto } from './dto/create-jogos.dto';
import { Jogo } from './entities/jogos.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JogosService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.jogos.findMany();
  }

  create(createJogosDto: CreateJogosDto) {
    const data: Jogo = { ...createJogosDto };

    return this.prisma.jogos.create({
      data
    });
  }
}
