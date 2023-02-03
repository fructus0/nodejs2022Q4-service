import { v4 as uuidv4 } from 'uuid';

export interface TrackAttributes {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export class TrackEntity implements TrackAttributes {
  constructor(
    public name: string,
    public artistId: string | null,
    public albumId: string | null,
    public duration: number,
    public id: string = uuidv4(),
  ) {}
}
