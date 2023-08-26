import { Injectable, NotFoundException } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
    constructor (private readonly postRepository: PostsRepository) {}

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
}
