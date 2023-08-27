import { Injectable } from '@nestjs/common';
import { PublicationRepository } from './publications.repository';
import { CreatePublicationDto } from './dtos/create-publication.dto';
import { MediasService } from '../medias/medias.service';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class PublicationsService {
    constructor (
        private readonly publicationRepository: PublicationRepository,
        private readonly mediasService: MediasService,
        private readonly postsService: PostsService) {}

    async createPublication(data: CreatePublicationDto){
        await this.mediasService.getMediaById(data.mediaId);
        await this.postsService.getPostById(data.postId);
        return await this.publicationRepository.createPublication(data);        
    }

}