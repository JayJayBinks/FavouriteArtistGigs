// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export enum ArtistServiceType {
  SPOTIFY, LASTFM
}

// replace this filename to 'environment.ts
export const environment = {
  production: false,

  // TODO this will be revealed in the http request :(
  eventfulApiKey: '',

  artistServiceType: ArtistServiceType.SPOTIFY,

  lastFmApiKey: '',
  lastFmUser: '',

  spotify_client_id: '',
  spotify_redirect_uri: 'http://localhost:4200/artists',
  spotify_scope: 'user-top-read',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
