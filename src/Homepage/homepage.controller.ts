import { Controller, Get, Param } from '@nestjs/common';
import { HomepageService } from './homepage.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Favorites and Genres")
@Controller('homepage')
export class HomepageController {
  constructor(private readonly homepageService: HomepageService) {}

  @ApiOperation({   
    summary: 'Viisualizar a lista de favoritos e de jogos por gênero',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homepageService.findOne(id);
  }

}
