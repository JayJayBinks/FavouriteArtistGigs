export class Gig {
  artist: string;
  date: Date;
  location: string;
  comment = '';

  constructor(artist: string, date: Date, location: string) {
    this.artist = artist;
    this.date = date;
    this.location = location;
  }
}
