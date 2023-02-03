export interface ArtistAttributes {
  id: string;
  name: string;
  grammy: boolean;
}

export class ArtistEntity implements ArtistAttributes {
  constructor(public id: string, public name: string, public grammy: boolean) {}
}
