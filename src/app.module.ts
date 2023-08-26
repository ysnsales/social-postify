import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MediaModule } from './medias/medias.module';

@Module({
  imports: [PrismaModule, MediaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
