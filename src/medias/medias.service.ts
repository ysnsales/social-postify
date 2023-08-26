import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { MediasRepository } from './medias.repository';
import { CreateMediaDto } from './dto/create-media.dto';

@Injectable()
export class MediasService {
    constructor (
        private readonly mediasRepository: MediasRepository
      ) {}

      async createMedia(createMediaDto: CreateMediaDto){
        await this.checkMedia(createMediaDto);
        return await this.mediasRepository.createMedia(createMediaDto);
      };

      async checkMedia(data: CreateMediaDto){
        const media = await this.mediasRepository.checkMedia(data);
        if (media) throw new ConflictException();
      }

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
      }
}
