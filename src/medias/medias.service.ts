import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { MediasRepository } from './medias.repository';
import { CreateMediaDto } from './dto/create-media.dto';
import { PublicationsService } from '../publications/publications.service';

@Injectable()
export class MediasService {
    constructor (
      private readonly mediasRepository: MediasRepository,
      private readonly publicationsService: PublicationsService) {}

      async createMedia(data: CreateMediaDto){
        await this.checkMedia(data);
        return await this.mediasRepository.createMedia(data);
      };

      async checkMedia(data: CreateMediaDto){
        const media = await this.mediasRepository.checkMedia(data);
        if (media) throw new ConflictException();
      };

      async getMedias() {
        return await this.mediasRepository.getMedias();
      };

      async getMediaById(id: number){
        const media = await this.mediasRepository.getMediaById(id);
        if(!media) throw new NotFoundException();
        return media;
      };

      async updateMedia(id: number, data: CreateMediaDto){
        await this.getMediaById(id);
        await this.checkMedia(data);
        return await this.mediasRepository.updateMedia(id, data);
      };

      async deleteMedia(id: number){
        await this.getMediaById(id);
        const publication = await this.publicationsService.getPublicationByMediaId(id);
        if (publication) throw new ForbiddenException();
        return await this.mediasRepository.deleteMedia(id);
      }
}
