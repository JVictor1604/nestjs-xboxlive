import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto} from './dto/update-profile.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.profiles.findMany();
  }

  async findbyId(id: string): Promise<Profile> {
    const record = await this.prisma.profiles.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com o '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string): Promise<Profile> {
    return this.findbyId(id);
  }

  handleError(error: Error): undefined {
    console.log(error.message)
    throw new UnprocessableEntityException(error.message);
  }

  create(dto: CreateProfileDto): Promise<Profile> {
    
    const data: Profile = { ...dto };

    return this.prisma.profiles.create({data}).catch(this.handleError)
  }

  async update(id: string, dto: UpdateProfileDto): Promise<Profile> {
    await this.findbyId(id);

    const data: Partial<Profile> = { ...dto };

    return this.prisma.profiles.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await this.findbyId(id);

    await this.prisma.profiles.delete({ where: { id } });
  }
}
