/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// Override the user-agent HTTP headers sent to Google Search

function rewriteUserAgent(e) {
  for (let header of e.requestHeaders) {
    if (header.name.toLowerCase() === "user-agent") {
      header.value = getUA(header.value, e.url);
    }
  }
  return {requestHeaders: e.requestHeaders};
}

browser.webRequest.onBeforeSendHeaders.addListener(
  rewriteUserAgent,
  {"urls": ["*://*/*"]},
  ["blocking", "requestHeaders"]
);

// Block the Google serviceworker, because it is currently causing strange issues.

function blockGoogleServiceWorker(e) {
  if (e.url.match(GoogleSearchTLDs) && e.url.indexOf("/serviceworker") != -1) {
    return {cancel: true};
  }
}

browser.webRequest.onBeforeRequest.addListener(
  blockGoogleServiceWorker,
  {"urls": ["*://*/*"]},
  ["blocking"]
);
