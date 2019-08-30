class TopArtistImageResource {
  size: string;
  text: string;
}

export class GigListResource {
  events: { event: GigResource[] };
}


export class PerformerResource {
  name: string;
}

export class GigResource {
  id: string;
  title: string;
  url: string;
  city_name: string;
  country_name: string;
  venue_name: string;
  start_time: Date;
  stop_time: Date;
  description: string;
  image: TopArtistImageResource[];
  performers: { performer: PerformerResource[] };
  comment: string;
}
