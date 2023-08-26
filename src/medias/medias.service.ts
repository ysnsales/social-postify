import { Injectable } from '@nestjs/common';
import { MediasRepository } from './medias.repository';
import { CreateMediaDto } from './dto/create-media.dto';

@Injectable()
export class MediasService {
    constructor (
        private readonly mediasRepository: MediasRepository
      ) {}

      async createMedia(createMediaDto: CreateMediaDto){
        return await this.mediasRepository.createMedia(createMediaDto);
      }

      async getMedias() {
        return await this.mediasRepository.getMedias();
      }
}
