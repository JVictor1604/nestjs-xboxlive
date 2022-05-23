import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateJogosDto } from './dto/create-jogos.dto';
import { JogosService } from './jogos.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Jogos")

@Controller('jogos')
export class JogosController {
  constructor(private JogosService: JogosService) {}

  @Get()
  findAll() {
    return this.JogosService.findAll();
  }

  @Post()
  create(@Body() createJogosDto: CreateJogosDto) {
    return this.JogosService.create(createJogosDto);
  }
}
