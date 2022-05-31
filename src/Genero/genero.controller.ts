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
import { CreateGeneroDto } from './dto/create-genero.dto';
import { GeneroService } from './genero.service';
import { ApiOperation,ApiTags } from '@nestjs/swagger';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { get } from 'http';

@ApiTags("Gênero")

@Controller('genre')
export class GeneroController {
  constructor(private genreService: GeneroService) {}

  @Get()
  @ApiOperation({
    summary: "Listar todos os gêneros"
  })
  findAll() {
    return this.genreService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Listar um gênero pelo ID"
  })
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(id);
  }

  @Post()
  @ApiOperation({   
    summary: 'Cadastrar um novo gênero',
  })
  create(@Body() dto: CreateGeneroDto) {
    return this.genreService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Editar um gênero pelo ID',
  })
  update(@Param('id') id: string, @Body() dto: UpdateGeneroDto) {
    return this.genreService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({    
    summary: 'Remover um gênero pelo ID',
  })
  delete(@Param('id') id: string) {
    this.genreService.delete(id);
  }
}

