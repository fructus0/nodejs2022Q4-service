import { v4 as uuidv4 } from 'uuid';

export interface ArtistAttributes {
  id: string;
  name: string;
  grammy: boolean;
}

export class ArtistEntity implements ArtistAttributes {
  public name: string;
  public grammy: boolean;
  public id: string = uuidv4();

  constructor(name: string, grammy: boolean) {
    this.name = name;
    this.grammy = grammy;
  }

  public updateInfo(partial: Partial<Omit<ArtistAttributes, 'id'>>) {
    Object.assign(this, partial);
  }
}
