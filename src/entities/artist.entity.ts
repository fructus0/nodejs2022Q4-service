import { v4 as uuidv4 } from 'uuid';

export interface ArtistAttributes {
  id: string;
  name: string;
  grammy: boolean;
}

export class ArtistEntity implements ArtistAttributes {
  constructor(
    public name: string,
    public grammy: boolean,
    public id: string = uuidv4(),
  ) {}

  public updateInfo(partial: Partial<Omit<ArtistAttributes, 'id'>>) {
    Object.assign(this, partial);
  }
}
