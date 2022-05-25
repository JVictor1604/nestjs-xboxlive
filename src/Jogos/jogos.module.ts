import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JogosController } from './jogos.controller';
import { JogosService } from './jogos.service';

@Module({

  imports: [PrismaModule],
  controllers: [JogosController],
  providers: [JogosService],
})
export class JogosModule {}