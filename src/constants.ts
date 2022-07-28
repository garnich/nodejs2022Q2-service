import { RelationOptions } from "typeorm";

const UUID_VERSION = '4';
const USER_VESION = 1;

const HEADERS = {
  ACCEPT: 'Accept',
  APP_JSON: 'application/json',
};

const EXEPTION_TYPE = {
  ARTISTS: 'artists',
  ALBUMS: 'albums',
  TRACKS: 'tracks',
};
const EXEPTION_ITEM = {
  ARTIST: 'artist',
  ALBUM: 'album',
  TRACK: 'track',
  USER: 'user',
};

const RELATIONS_OPTIONS: RelationOptions = {
  nullable: true,
  onDelete: 'SET NULL',
  cascade: true,
  eager: true,
};

export { UUID_VERSION, HEADERS, EXEPTION_TYPE, EXEPTION_ITEM, USER_VESION, RELATIONS_OPTIONS };
