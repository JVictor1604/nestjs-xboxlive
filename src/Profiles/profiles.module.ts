import { Module } from '@nestjs/common';
import { ProfileService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProfilesController],
  providers: [ProfileService]
})
export class ProfilesModule {}
