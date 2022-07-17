import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { IDValidator, invalidIdExeption, itemNotExistExeption } from 'src/helpers';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackDto } from './dto/track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

import { ITracks } from './tracks.interface'
import { TracksService } from './tracks.service';


@Controller('track')
export class TracksController {
    constructor(private readonly trackService: TracksService) {}

    @Get()
    @Header('Accept', 'application/json')
    @HttpCode(HttpStatus.OK)
    findAll(): ITracks[] {
        return this.trackService.getTracks();
    }

    @Post()
    @Header('Accept', 'application/json')
    @HttpCode(HttpStatus.CREATED)
    createTrack(@Body(new ValidationPipe()) CreateTrackDto: CreateTrackDto): ITracks {
        return this.trackService.createTrack(CreateTrackDto);
    }

    @Put(':id')
    @Header('Accept', 'application/json')
    @HttpCode(HttpStatus.OK)
    updateTrack(@Body(new ValidationPipe()) updateTrackDto: UpdateTrackDto, @Param('id', new ParseUUIDPipe({ version: '4' })) id: string): TrackDto {
        if(!IDValidator(id)) {
            throw invalidIdExeption();
        } else {
            const isTrackExist: boolean = !!this.trackService.getTrack(id);
            
            if(!isTrackExist) {
                throw itemNotExistExeption('track');
            } else {
                return this.trackService.updateTrack(id, updateTrackDto); 
            }
        }
    }

    @Delete(':id')
    @Header('Accept', 'application/json')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string){
        if(!IDValidator(id)) {
            throw invalidIdExeption();
        } else {
            const isTrackExist: boolean = !!this.trackService.getTrack(id);
            
            if(!isTrackExist) {
                throw itemNotExistExeption('track');
            } else {
                return this.trackService.deleteTrack(id);
            }
        }
    }

    @Get(':id')
    @Header('Accept', 'application/json')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): ITracks {
        if(!IDValidator(id)) {
            throw invalidIdExeption();
        } else {
            const isTrackExist: boolean = !!this.trackService.getTrack(id);
            
            if(!isTrackExist) {
                throw itemNotExistExeption('track');
            } else {
                return this.trackService.getTrack(id);
            }
        }
    }
}
