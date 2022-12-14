// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Library } from "src/app/libraries/library";


export const environment = {
  production: false,
  MAX_TURN_NUMBER: 12,
  COLOR_NUMBER: 8,
  COMBI_COLOR_NUMBER: 4,
  LIMIT_MATCHING_COMBIS: 9,
  MAX_POSSIBLE_COMBI_NUMBER: Library.fact(8) / Library.fact(4)
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
