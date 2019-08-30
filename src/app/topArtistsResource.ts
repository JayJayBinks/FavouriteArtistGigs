class TopArtistImageResource {
  size: string;
  text: string;
}

export class TopArtistsResource {
  topartists: { artist: TopArtist[] };
}


export class TopArtist {
  name: string;
  playcount: number;
  mbid: string;
  url: string;
  image: TopArtistImageResource[];
  comment: string;

  getRank(): number {
    return this['@attr'].rank;
  }
}
