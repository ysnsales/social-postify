import { ForbiddenException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { PublicationRepository } from './publications.repository';
import { CreatePublicationDto } from './dtos/create-publication.dto';
import { MediasService } from '../medias/medias.service';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class PublicationsService {
    constructor (
        private readonly publicationRepository: PublicationRepository,
        @Inject(forwardRef(() => MediasService))
        private readonly mediasService: MediasService,
        @Inject(forwardRef(() => PostsService))
        private readonly postsService: PostsService,) {}

    async createPublication(data: CreatePublicationDto){
        await this.mediasService.getMediaById(data.mediaId);
        await this.postsService.getPostById(data.postId);
        return await this.publicationRepository.createPublication(data);        
    };

    async getPublications(published?: string, after?: Date){
        return await this.publicationRepository.getPublications(published, after);
    }

    async getPublicationById(id: number){
        const publication = await this.publicationRepository.getPublicationsById(id);
        if (!publication) throw new NotFoundException();
        return publication;
    }

    async updatePublication(id: number, data: CreatePublicationDto){
        await this.getPublicationById(id);
        await this.mediasService.getMediaById(data.mediaId);
        await this.postsService.getPostById(data.postId);
        if (new Date(data.date) < new Date()) throw new ForbiddenException; //veriicar se ja foi publicado

        return await this.publicationRepository.updatePublication(id, data);
    }

    async deletePublication(id: number){
        await this.getPublicationById(id);
        return await this.publicationRepository.deletePublication(id);
    }

    async getPublicationByMediaId(mediaId: number){
        return await this.publicationRepository.getPublicationsByMediaId(mediaId);
    }

    async getPublicationByPostId(postId: number){
        return await this.publicationRepository.getPublicationsByPostId(postId);
    }

}
