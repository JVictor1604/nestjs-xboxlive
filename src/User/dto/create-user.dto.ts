import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateUserDto {
 
  @IsString()
  @ApiProperty({
    description: 'Nome do Usuário',
    example: "José Victor",
   })
  name: string;


  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'Email do Usuário',
    example: "jose123@gmail.com",
   })
  email: string;

  @IsString()
  @ApiProperty({

    description: "Senha do usuário",
    example: "J@W1949",
  })
  password: string;
   
  @IsNumber()
  @ApiProperty({

    description: "CPF do usuário",
    example: 12345678910,
  })
  cpf: number;
   
  @IsBoolean()
  @ApiProperty({

    description: "Verificar se o Usuário é Administrador",
    example: true,
  })
  isAdm: boolean;

}


