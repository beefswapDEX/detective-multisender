// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { CHAIN_ID } from "src/app/config/constants/networks";

export const environment = {
  production: false,
  covalenthq_gateway: 'https://api.covalenthq.com/v1/'+CHAIN_ID,
  covalenthq_apikey: 'ckey_dcdc66cc368441f783b5e3beae5'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
