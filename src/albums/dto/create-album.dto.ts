export class CreateAlbumDto {
    readonly name: string;
    readonly year: number;
    readonly artistId: string | null; // refers to Artist
}
