import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNumber, IsPositive, IsString, Length, Matches, maxLength, MinLength } from 'class-validator';

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

  @MinLength(8)
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({

    description: "Senha do usuário com no mínimo 8 caracteres",
    example: "J@W1949r",
  })
  password: string;


  @ApiProperty({

    description: "Confirmação da senha, deve ser igual a senha  digitada anteriomente",
    example: "J@W1949r",
  })
  confirmPassword: string;

  
  @IsString()
  @ApiProperty({

    description: "CPF do usuário",
    example: "12345678910",
  })
  cpf: string;
   
  @IsBoolean()
  @ApiProperty({

    description: "Verificar se o Usuário é Administrador",
    example: true,
  })
  isAdm: boolean;

}


