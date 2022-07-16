export class TrackDto {
    readonly id: string;
    readonly name: string;
    readonly artistId: string | null; // refers to Artist
    readonly albumId: string | null; // refers to Album
    readonly duration: number;
}