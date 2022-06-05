import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Profiles")

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly ProfileService: ProfileService) {}

  @Get()
  @ApiOperation({
    summary: "Listar todos os profiles"
  })
  findAll() {
    return this.ProfileService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: "Listar um profile pelo ID"
  })
  findOne(@Param('id') id: string) {
    return this.ProfileService.findOne(id);
  }

  @ApiOperation({
    summary: "Criar um novo profile"
  })
  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.ProfileService.create(createProfileDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: "Editar um profile pelo ID"
  })
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.ProfileService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: "deletar um profile pelo ID"
  })
  remove(@Param('id') id: string) {
    return this.ProfileService.delete(id);
  }
}
