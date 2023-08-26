import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";

@Injectable()
export class PostsRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createPost(data: CreatePostDto){
        return this.prisma.post.create({
            data,
            select: {
                id: true,
                title: true,
                text: true,
                image: true
            }

        })
    }

    async getPosts(){
        return this.prisma.post.findMany({
            select: {
                id: true,
                title: true,
                text: true,
                image: true
            }
        })
    }

    async getPostById(id: number){
        return this.prisma.post.findFirst({
            where: { id },
            select: {
                id: true,
                title: true,
                text: true,
                image: true
            }
        })
    }
}