import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { HomepageService } from './homepage.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags("Homepage")
@UseGuards(AuthGuard())
@ApiBearerAuth()
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
