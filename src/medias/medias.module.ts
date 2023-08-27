import { Module } from '@nestjs/common';
import { MediasService } from './medias.service';
import { MediasController } from './medias.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MediasRepository } from './medias.repository';

@Module({
  imports: [PrismaModule],
  providers: [MediasService, MediasRepository],
  controllers: [MediasController],
  exports: [MediasService]
})
export class MediasModule {}
