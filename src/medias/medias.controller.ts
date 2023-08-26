import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';

@Controller('medias')
export class MediasController {
    constructor(private readonly mediasService: MediasService) {}

    @Post()
    createMedia(@Body() data: CreateMediaDto){
        return this.mediasService.createMedia(data);
    }

    @Get()
    getMedias() {
        return this.mediasService.getMedias();
    }

    @Get(':id')
    getMediasById(@Param('id', ParseIntPipe) id: string) {
        return this.mediasService.getMediaById(+id);
    }

    @Put(':id')
    updateMedia(@Param('id', ParseIntPipe) id: string, @Body() data: CreateMediaDto) {
        return this.mediasService.updateMedia(+id, data);
    }
}
