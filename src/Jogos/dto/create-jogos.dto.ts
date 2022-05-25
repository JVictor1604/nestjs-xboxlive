import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateJogosDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do Game',
    example: "Forza Horizon",
   })
  nome: string;
  @ApiProperty({
    description: 'Genero do game',
    example: "Corrida",
   })
  genero: string;
}

