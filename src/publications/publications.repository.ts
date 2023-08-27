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

    async getPublications(published?: string, after?: Date) {
        return this.prisma.publication.findMany({
            where: {
                date: {
                    lt: published === 'true' ? new Date() : undefined,
                    gt: published === 'false' ? new Date() : undefined
                },
                AND: {
                    date: {
                        gt: after ? new Date(after) : undefined,
                    }
                }
            },
            select: {
                id: true,
                mediaId: true,
                postId: true,
                date: true
            }
        })
    }

    async getPublicationsById(id: number){
        return this.prisma.publication.findFirst({
            where: { id },
            select: {
                id: true,
                mediaId: true,
                postId: true,
                date: true
            }
        })
    }

    async updatePublication(id: number, data: CreatePublicationDto){
        return this.prisma.publication.update({
            where: { id },
            data,
            select: {
                id: true,
                mediaId: true,
                postId: true,
                date: true
            }
        })
    }

    async deletePublication(id: number){
        return this.prisma.publication.delete({where: { id }});
    }

}