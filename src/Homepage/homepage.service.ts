import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HomepageService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string) {
    const favorites = await this.prisma.profiles.findUnique({
      where: { id },
      select: { jogos: { select: { jogos: true } } },
    });

    const genres = await this.prisma.genre.findMany({
      select: {
        gender: true,
        jogos: { select: { jogos: { select: { title: true, id: true } } } },
      },
    });

    return [{favorites}, {genres}]
  }
}
