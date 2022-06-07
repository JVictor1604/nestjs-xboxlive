import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Profile } from './entities/profile.entity';
import { handleError } from 'src/handle-error-util';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  profileSelect = {
    id: true,
    title: true,
    image: true,
    user: {
      select: {
        id: true,
        name: true,
      },
    },
  };

  async findAll() {
    const profiles = await this.prisma.profiles.findMany({
      select: {
        id: true,
        title: true,
        image: true,
        user: { select: { id: true, name: true } },
      },
    });
    if (profiles.length == 0) {
      throw new NotFoundException(`Nada foi encontrado.`);
    }
    return profiles;
  }

  async findbyId(id: string) {
    const record = await this.prisma.profiles.findUnique({
      where: { id },
      include: {
        user: { select: { name: true } },
      },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string) {
    return this.findbyId(id);
  }

  create(dto: CreateProfileDto) {
    const data: Prisma.ProfilesCreateInput = {
      title: dto.title,
      image: dto.image,
      user: {
        connect: {
          id: dto.userId,
        },
      },
    };

    return this.prisma.profiles
      .create({
        data,
        select: this.profileSelect,
      })
      .catch(handleError);
  }

  async update(id: string, dto: UpdateProfileDto) {
    await this.findbyId(id);

    const data: Partial<Prisma.ProfilesCreateInput> = {
      title: dto.title,
      image: dto.image,
      user: {
        connect: {
          id: dto.userId,
        },
      },
    };
    return this.prisma.profiles
      .update({
        where: { id },
        data,
        select: this.profileSelect,
      })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findbyId(id);

    await this.prisma.profiles.delete({ where: { id } });
  }
}
