/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// Override the navigator.userAgent value Google Search sees

window.wrappedJSObject.eval(`(function() {
  isGoogle = e.url.match(GoogleSearchTLDs);
  newUA = getUA(navigator.userAgent, isGoogle);
  Object.defineProperty(navigator, "userAgent", {
    get: () => ${JSON.stringify(newUA);
}());`);
