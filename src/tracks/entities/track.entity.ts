import { v4 as uuidv4 } from 'uuid';

export interface TrackAttributes {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export class TrackEntity implements TrackAttributes {
  public name: string;
  public artistId: string | null;
  public albumId: string | null;
  public duration: number;
  public id: string = uuidv4();

  constructor(
    name: string,
    artistId: string | null,
    albumId: string | null,
    duration: number,
  ) {
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }

  updateInfo(partial: Omit<Partial<TrackAttributes>, 'id'>) {
    Object.assign(this, partial);
  }
}
