import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateAlbumDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    year: number;

    @IsOptional()
    @IsUUID()
    artistId: string | null;
}
