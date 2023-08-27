import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePublicationDto } from "./dtos/create-publication.dto";

@Injectable()
export class PublicationRepository{
    constructor(private readonly prisma: PrismaService) {}

    async createPublication(data: CreatePublicationDto){
        return this.prisma.publication.create({
            data,
            select: {
                id: true,
                mediaId: true,
                postId: true,
                date: true
            }
        })
    }

}