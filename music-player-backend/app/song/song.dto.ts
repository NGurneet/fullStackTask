import { type BaseSchema } from "../common/dto/base.dto";

export interface ISong extends BaseSchema {
  title: string;
  artist: string;
  album?: string;
  genre?: string;
  lyrics?: string;
  songUrl: string;
  playlistId?: string;
  size: number;
}
