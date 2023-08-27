import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dtos/create-publication.dto';

@Controller('publications')
export class PublicationsController {
    constructor (private readonly publicationsService: PublicationsService) {}

    @Post()
    createPublication(@Body() data: CreatePublicationDto){
        return this.publicationsService.createPublication(data);
    }

    @Get()
    getPublications(@Query('published') published?: string, @Query('after') after?: Date){
        return this.publicationsService.getPublications(published, after);
    }

    @Get(':id')
    getPublicationById(@Param('id', ParseIntPipe) id: string){
        return this.publicationsService.getPublicationById(+id);
    }

    @Put(':id')
    updatePublication(@Param('id', ParseIntPipe) id: string, @Body() data: CreatePublicationDto){
        return this.publicationsService.updatePublication(+id, data);
    }
}
