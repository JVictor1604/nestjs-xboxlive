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

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();

    if (!lastErrorLine) {
      console.error(error);
    }

    throw new UnprocessableEntityException(
      lastErrorLine || 'Algum erro ocorreu ao executar a operação',
    );
  }

  async create(dto: CreateUserDto): Promise<User> {
    if (dto.password != dto.confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais.');
    }

    delete dto.confirmPassword;

    const data: User = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    };

    return this.prisma.user
      .create({
        data,
        select: this.Userselect,
      })
      .catch(this.handleError);
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
    }).catch(this.handleError);
  }

  async delete(id: string) {
    await this.findbyId(id);

    await this.prisma.user.delete({ where: { id } });
  }
}
