import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PostsRepository } from './posts.repository';

@Module({
  imports: [PrismaModule],
  providers: [PostsService, PostsRepository],
  controllers: [PostsController],
  exports: [PostsService]
})
export class PostsModule {}
