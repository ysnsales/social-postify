import { ForbiddenException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { PublicationsService } from '../publications/publications.service';

@Injectable()
export class PostsService {
    constructor (
        private readonly postRepository: PostsRepository,
        @Inject(forwardRef(() => PublicationsService))
        private readonly publicationsService: PublicationsService
        ) {}

    async createPost(data: CreatePostDto){
        return await this.postRepository.createPost(data);
    }

    async getPosts(){
        return await this.postRepository.getPosts();
    }

    async getPostById(id: number){
        const post = await this.postRepository.getPostById(id);
        if(!post) throw new NotFoundException();
        return post;
    }

    async updatePost(id: number, data: CreatePostDto){
        await this.getPostById(id);
        return await this.postRepository.updatePost(id, data);
      }

      async deletePost(id: number){
        await this.getPostById(id);
        const publication = await this.publicationsService.getPublicationByPostId(id);
        if (publication) throw new ForbiddenException();
        return await this.postRepository.deletePost(id);
      }
}
