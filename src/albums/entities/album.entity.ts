import { v4 as uuidv4 } from 'uuid';

export interface AlbumAttributes {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export class AlbumEntity implements AlbumAttributes {
  public name: string;
  public year: number;
  public artistId: string | null;
  public id: string = uuidv4();

  constructor(name: string, year: number, artistId: string | null) {
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }

  public updateInfo(partial: Partial<Omit<AlbumAttributes, 'id'>>) {
    Object.assign(this, partial);
  }
}
