import { ApiProperty } from '@nestjs/swagger';
import { isNotEmpty, IsNumber, isPositive, IsString, IsUrl, IsUUID, maxLength } from 'class-validator';

export class CreateJogosDto {
 
  @IsString()
  @ApiProperty({
    description: 'Nome do Game',
    example: "Forza Horizon",
   })
  title: string;

  @IsString()
  @IsUrl()
  @ApiProperty({
    description: 'Url da imagem do jogo.',
    example: 'https://windowsclub.com.br/wp-content/uploads/2021/06/forza-horizon-5-2.jpg',
  })
  coverimgUrl: string;

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
   

  @IsNumber({
    maxDecimalPlaces: 1,
  })
  @ApiProperty({
    description: 'Nota do IMDb para o jogo.',
    example: 5,
  })
  imdbScore: number;


  @IsString()
  @IsUrl()
  @ApiProperty({
    description: 'Url do trailer do jogo.',
    example: 'https://www.youtube.com/watch?v=vLj-27T-SEQ',
  })
  trailerYouTubeUrl: string;

 
  @IsString()
  @IsUrl()
  @ApiProperty({
    description: 'Url de uma game play do jogo.',
    example: 'https://www.youtube.com/watch?v=OXCULaCzB0E',
  })
  gameplayYouTubeUrl: string;


  @IsUUID(undefined, {each: true})
  @ApiProperty({
    description: 'Lista com os IDs dos gêneros do jogo.',
    example:
      '["e1b8679e-a3b8-429c-8e97-e6dd89274ae3", "31921fd0-46f3-442d-816d-ea38688d05fe"]',
  })
  genres: string[];
}


