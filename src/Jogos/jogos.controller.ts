import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateJogosDto } from './dto/create-jogos.dto';
import { JogosService } from './jogos.service';
import { ApiOperation,ApiTags } from '@nestjs/swagger';
import { UpdateJogosDto } from './dto/update-jogos.dto';
import { get } from 'http';

@ApiTags("Jogos")

@Controller('jogos')
export class JogosController {
  constructor(private JogosService: JogosService) {}

  @Get()
  @ApiOperation({
    summary: "Listar todos os games"
  })
  findAll() {
    return this.JogosService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Listar um game pelo ID"
  })
  findOne(@Param('id') id: string) {
    return this.JogosService.findOne(id);
  }

  @Get(":gender")
  @ApiOperation({
    summary: "Lista de games pelo gênero"
  })
  findbyGender(@Param('gender') gender: string) {
    return this.JogosService.findbyGender(gender);
  }

  @Post()
  @ApiOperation({   
    summary: 'Cadastrar um novo game',
  })
  create(@Body() createJogosDto: CreateJogosDto) {
    return this.JogosService.create(createJogosDto);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Editar um game pelo ID',
  })
  update(@Param('id') id: string, @Body() updateJogosDto: UpdateJogosDto) {
    return this.JogosService.update(id, updateJogosDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({    
    summary: 'Remover um game pelo ID',
  })
  delete(@Param('id') id: string) {
    this.JogosService.delete(id);
  }
}

