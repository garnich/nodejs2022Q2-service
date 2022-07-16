import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackDto } from './dto/track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

import { ITracks } from './tracks.interface'
import { TracksService } from './tracks.service';


@Controller('tracks')
export class TracksController {
    constructor(private readonly trackService: TracksService) {}

    @Get()
    findAll(): ITracks[] {
        return this.trackService.getTracks();
    }

    @Post()
    createTrack(@Body(new ValidationPipe()) CreateTrackDto: CreateTrackDto): ITracks {
        return this.trackService.createTrack(CreateTrackDto);
    }

    @Put(':id')
    updateTrack(@Body(new ValidationPipe()) updateTrackDto: UpdateTrackDto, @Param('id') id: string): TrackDto {
        return this.trackService.updateTrack(id, updateTrackDto); 
    }

    @Delete(':id')
    deleteTrack(@Param('id') id: string){
        return this.trackService.deleteTrack(id);
    }

    @Get(':id')
    findById(@Param('id') id: string): ITracks {
        return this.trackService.getTrack(id);
    }
}