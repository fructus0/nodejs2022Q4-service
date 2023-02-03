interface FavoriteAttribute {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export class FavoriteEntity implements FavoriteAttribute {
  constructor(
    public artists: string[],
    public albums: string[],
    public tracks: string[],
  ) {}
}
