// TODO transform last fm into this or generalize
export class ArtistList {
  items: ArtistModel[];
}

export class ArtistModel {
  external_urls: {
    spotify: string
  };
  followers: {
    href: string;
    total: number
  };
  genres: string [];
  href: string;
  id: string;
  images: [
    {
      height: number;
      url: string;
      width: number;
    }
  ];
  name: string;
  popularity: number;
  rank: number;
  type: string;
  uri: string;
  comment: string;
}
