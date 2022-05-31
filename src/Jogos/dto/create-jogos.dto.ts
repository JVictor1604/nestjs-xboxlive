import { ApiProperty } from '@nestjs/swagger';
import { isNotEmpty, IsNumber, isPositive, IsString, IsUrl, maxLength } from 'class-validator';

export class CreateJogosDto {
 
  @IsString()
  @ApiProperty({
    description: 'Nome do Game',
    example: "Forza Horizon",
   })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'Gênero do game',
    example: "Corrida",
   })
  gender: string;

  @IsString()
  @ApiProperty({

    description: "Descrição do game",
    example: "Sua maior aventura Horizon te espera! Lidere impressionantes expedições pelo mundo aberto vibrante e em constante evolução nas terras mexicanas. Participe de corridas divertidas e sem limites enquanto pilota centenas dos melhores carros do mundo.",
  })
  description: string;
   
 
  @IsNumber()
  @ApiProperty({

    description: "Ano do lançamento do game",
    example: 2021,
  })
  year: number;
   
  @IsNumber()
  @ApiProperty({

    description: "Nota do Imdb",
    example: 5,
  })
  imdbScore: number;


  @IsString()
  @IsUrl()
  @ApiProperty({
    description: "Gameplay do game no Youtube",
    example: "https://www.youtube.com/watch?v=E2Ah8Dr9o2I",
  })
  gameplayYouTubeUrl: string;
}

