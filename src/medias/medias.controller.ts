import { Body, Controller, Get, Post } from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';

@Controller('medias')
export class MediasController {
    constructor(private readonly mediasService: MediasService) {}

    @Post()
    create(@Body() createMediaDto: CreateMediaDto){
        return this.mediasService.createMedia(createMediaDto);
    }

    @Get()
    findAll() {
        return this.mediasService.getMedias();
    }
}
