import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Status")

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  GetStatus(): string {
    return this.appService.GetAppStatus();
  }
}
