import { Body, Controller, Post } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dtos/create-publication.dto';

@Controller('publications')
export class PublicationsController {
    constructor (private readonly publicationService: PublicationsService) {}

    @Post()
    createPublication(@Body() data: CreatePublicationDto){
        return this.publicationService.createPublication(data);
    }
}
