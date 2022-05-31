import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGeneroDto {
  @IsString()
  @ApiProperty({
    description: 'nome do Gênero que se aplica a algum game',
    example: 'Simulação',
  })
  gender: string;
}
