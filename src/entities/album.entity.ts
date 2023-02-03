export interface AlbumAttributes {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export class AlbumEntity implements AlbumAttributes {
  constructor(
    public id: string,
    public name: string,
    public year: number,
    public artistId: string | null,
  ) {}
}
