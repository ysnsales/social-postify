import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    createPost(@Body() data: CreatePostDto){
        return this.postsService.createPost(data);
    }

    @Get()
    getPosts(){
        return this.postsService.getPosts();
    }

    @Get(':id')
    getPosById(@Param('id', ParseIntPipe) id: string){
        return this.postsService.getPostById(+id);
    }

    @Put(':id')
    updatePost(@Param('id', ParseIntPipe) id: string, @Body() data: CreatePostDto) {
        return this.postsService.updatePost(+id, data);
    }
}
