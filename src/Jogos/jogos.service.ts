import { Injectable } from '@nestjs/common';
import { CreateJogosDto } from './dto/create-jogos.dto';
import { Jogo } from './entities/jogos.entity';


@Injectable()
export class JogosService {

    jogos: Jogo[] = [];

    findAll() {
      return this.jogos;
    }
  
    create(createJogosDto: CreateJogosDto) {
      const jogo: Jogo = { id: 'random_id', ...createJogosDto };
  
      this.jogos.push(jogo);
  
      return jogo;
    }
}