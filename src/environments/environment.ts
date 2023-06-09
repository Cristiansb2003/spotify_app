// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  spotify: {
    CLIENT_ID: '449ddf99142249d1ba9c1de3bd71db6c',
    CLIENT_SECRET: '65a72110af5a45c1a8e02e1dbbd1d7da',
  },
  firebaseConfig: {
    apiKey: 'AIzaSyCwDi5i9u81aR8bSuCB-fXP19QBNqWuoOk',
    authDomain: 'spotify-app-cebea.firebaseapp.com',
    projectId: 'spotify-app-cebea',
    storageBucket: 'spotify-app-cebea.appspot.com',
    messagingSenderId: '840951958376',
    appId: '1:840951958376:web:312aa7db743a0439cee4dd',
    measurementId: 'G-X22WPX93TW',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
