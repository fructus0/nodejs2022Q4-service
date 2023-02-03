import { v4 as uuidv4 } from 'uuid';

export interface AlbumAttributes {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export class AlbumEntity implements AlbumAttributes {
  constructor(
    public name: string,
    public year: number,
    public artistId: string | null,
    public id: string = uuidv4(),
  ) {}

  public updateInfo(partial: Partial<Omit<AlbumAttributes, 'id'>>) {
    Object.assign(this, partial);
  }
}
