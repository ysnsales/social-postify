import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
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
    getMedias() {
        return this.mediasService.getMedias();
    }

    @Get(':id')
    getMediasById(@Param('id', ParseIntPipe) id: string) {
        return this.mediasService.getMediaById(+id);
    }
}
