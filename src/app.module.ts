import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JogosModule } from './Jogos/jogos.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './User/user.module';
import { GeneroModule } from './Genero/genero.module';
import { ProfilesModule } from './Profiles/profiles.module';
import { HomepageModule } from './Homepage/homepage.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [JogosModule, PrismaModule, UserModule, GeneroModule, ProfilesModule, HomepageModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
