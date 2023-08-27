import { Module } from '@nestjs/common';
import { PublicationsController } from './publications.controller';
import { PublicationsService } from './publications.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PostsModule } from '../posts/posts.module';
import { MediasModule } from '../medias/medias.module';
import { PublicationRepository } from './publications.repository';

@Module({
  imports: [PrismaModule, PostsModule, MediasModule],
  controllers: [PublicationsController],
  providers: [PublicationsService, PublicationRepository],
  exports: [PublicationsService]
})
export class PublicationsModule {}
