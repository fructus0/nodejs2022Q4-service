interface FavoriteAttribute {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export class FavoriteEntity implements FavoriteAttribute {
  public artists: string[];
  public albums: string[];
  public tracks: string[];

  constructor(artists: string[], albums: string[], tracks: string[]) {
    this.albums = albums;
    this.artists = artists;
    this.tracks = tracks;
  }
}
