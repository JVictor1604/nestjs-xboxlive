import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JogosModule } from './Jogos/jogos.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [JogosModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
