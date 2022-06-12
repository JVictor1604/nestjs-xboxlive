import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JogosController } from './jogos.controller';
import { JogosService } from './jogos.service';

@Module({

  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [JogosController],
  providers: [JogosService],
})
export class JogosModule {}