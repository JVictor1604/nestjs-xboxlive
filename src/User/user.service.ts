import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { PartialType } from '@nestjs/swagger';
import { handleError } from 'src/User/Util/handle-error-util';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private Userselect = {
    id: true,
    name: true,
    email: true,
    password: false,
    cpf: true,
    isAdm: true,
  };
  async findAll() {
    return await this.prisma.user.findMany({ select: this.Userselect });
  }

  async findbyId(id: string): Promise<User> {
    const record = await this.prisma.user.findUnique({
      where: { id },
      select: this.Userselect,
    });

    if (!record) {
      throw new NotFoundException(`Registro com o '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string): Promise<User> {
    return this.findbyId(id);
  }

  async create(dto: CreateUserDto): Promise<User> {
    if (dto.password != dto.confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais.');
    }

    delete dto.confirmPassword;

    const data: User = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    }

    return this.prisma.user
      .create({
        data,
        select: this.Userselect,
      })
      .catch(handleError);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    if (dto.password) {
      if (dto.password != dto.confirmPassword) {
        throw new BadRequestException('As senhas informadas não são iguais.');
      }
    }

    delete dto.confirmPassword;

    await this.findbyId(id);

    const data: Partial<User> = { ...dto };

    if (data.password) {
      data.password = await bcrypt.hash(dto.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data, select: this.Userselect
    }).catch(handleError);
  }

  async delete(id: string) {
    await this.findbyId(id);

    await this.prisma.user.delete({ where: { id } });
  }
}
