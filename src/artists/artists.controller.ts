import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistDto } from './dto/artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

import { IArtists } from './artists.interface'
import { ArtistsService } from './artists.service';


@Controller('artists')
export class ArtistsController {
    constructor(private readonly artistService: ArtistsService) {}

    @Get()
    findAll(): IArtists[] {
        return this.artistService.getArtists();
    }

    @Post()
    createArtist(@Body(new ValidationPipe()) CreateArtistDto: CreateArtistDto): IArtists {
        return this.artistService.createArtist(CreateArtistDto);
    }

    @Put(':id')
    updateArtist(@Body(new ValidationPipe()) updateArtistDto: UpdateArtistDto, @Param('id') id: string): ArtistDto {
        return this.artistService.updateArtist(id, updateArtistDto); 
    }

    @Delete(':id')
    deleteArtist(@Param('id') id: string){
        return this.artistService.deleteArtist(id);
    }

    @Get(':id')
    findById(@Param('id') id: string): IArtists {
        return this.artistService.getArtist(id);
    }
}
