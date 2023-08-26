import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateMediaDto } from "./dto/create-media.dto";

@Injectable()
export class MediasRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createMedia(data: CreateMediaDto){
        return this.prisma.media.create({
            data,
            select: {
                id: true,
                title: true,
                username: true
            }
        })
    }

    async checkMedia(data: CreateMediaDto){
        return this.prisma.media.findFirst({
            where: {title: data.title, username: data.username}
        })
    }

    async getMedias(){
        return this.prisma.media.findMany({
            select: {
                id: true,
                title: true,
                username: true
            }
        })
    }

    async getMediaById(id: number){
        return this.prisma.media.findFirst({
            where: { id },
            select: {
                id: true,
                title: true,
                username: true
            }
        })

    }

}