import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistDto } from './dto/artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

import { IArtists } from './artists.interface'
import { ArtistsService } from './artists.service';
import { IDValidator, invalidIdExeption, itemNotExistExeption } from 'src/helpers';


@Controller('artists')
export class ArtistsController {
    constructor(private readonly artistService: ArtistsService) {}

    @Get()
    @Header('Content-Type', 'application/json')
    @HttpCode(HttpStatus.OK)
    findAll(): IArtists[] {
        return this.artistService.getArtists();
    }

    @Post()
    @Header('Content-Type', 'application/json')
    @HttpCode(HttpStatus.CREATED)
    createArtist(@Body(new ValidationPipe()) CreateArtistDto: CreateArtistDto): IArtists {
        return this.artistService.createArtist(CreateArtistDto);
    }

    @Put(':id')
    @Header('Content-Type', 'application/json')
    @HttpCode(HttpStatus.OK)
    updateArtist(@Body(new ValidationPipe()) updateArtistDto: UpdateArtistDto, @Param('id') id: string): ArtistDto {
        if(!IDValidator(id)) throw invalidIdExeption();

        const isArtistExist: boolean = !!this.artistService.getArtist(id);

        if(!isArtistExist) throw itemNotExistExeption('artist');

        return this.artistService.updateArtist(id, updateArtistDto); 
    }

    @Delete(':id')
    @Header('Content-Type', 'application/json')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteArtist(@Param('id') id: string){
        if(!IDValidator(id)) throw invalidIdExeption();

        const isArtistExist: boolean = !!this.artistService.getArtist(id);

        if(!isArtistExist) throw itemNotExistExeption('artist');

        return this.artistService.deleteArtist(id);
    }

    @Get(':id')
    @Header('Content-Type', 'application/json')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id') id: string): IArtists {
        if(!IDValidator(id)) throw invalidIdExeption();

        const isArtistExist: boolean = !!this.artistService.getArtist(id);

        if(!isArtistExist) throw itemNotExistExeption('artist');

        return this.artistService.getArtist(id);
    }
}
