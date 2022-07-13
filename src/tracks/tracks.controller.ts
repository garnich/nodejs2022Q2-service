import { v4 as uuidv4 } from 'uuid';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DB } from '../mockedDB/mocked';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackDto } from './dto/track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('tracks')
export class TracksController {

    @Get()
    getAllTracks() {
        return DB.tracks;
    }

    @Post()
    createTrack(@Body() createTrackDto: CreateTrackDto): TrackDto{
        const newTrack = {
            id: uuidv4(),
            name: createTrackDto.name,
            artistId: createTrackDto.artistId,
            albumId: createTrackDto.albumId,
            duration: createTrackDto.duration
        }

        DB.tracks.push(newTrack);

        return DB.tracks.find((track) => track.id === newTrack.id)
    }

    @Put(':id')
    updatetrack(@Body() updateTrackDto: UpdateTrackDto, @Param('id') id: string): TrackDto {
        const idx = DB.tracks.findIndex(track => track.id === id)
        
        DB.tracks[idx] = {...DB.tracks[idx], ...updateTrackDto};
  
        return DB.tracks[idx] 
    }

    @Delete(':id')
    deleteTrack(@Param('id') id: string): TrackDto[]{

        const idx = DB.tracks.findIndex(track => track.id === id)
        const newTracksData = [...DB.tracks.slice(0, idx), ...DB.tracks.slice(idx + 1)]
  
        DB.tracks = newTracksData;
  
        return DB.tracks
    }
}
