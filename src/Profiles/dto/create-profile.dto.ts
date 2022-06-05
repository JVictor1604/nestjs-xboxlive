import { ApiProperty } from '@nestjs/swagger';
import {  IsString, IsUrl } from 'class-validator';

export class CreateProfileDto {


@IsString()
@ApiProperty({

    description: "Título do game",
    example: "Forza Horizon"
})
title: string;

@IsString()
@IsUrl()
@ApiProperty({

    description: "Url da imagem do game",
    example: "https://s2.glbimg.com/r5FN3juyaUyWQn6O5U0WlcQRACQ=/0x0:2400x1350/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/o/F/TT2xyvRXuQCXuIJ3nC4Q/forzahorizon5-keyart-horiz-rgb-final.jpg"
})
image: string;

}
