// background.js
var lastUrl = '';
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, async tabs => {
      let url = tabs[0].url;
      if (lastUrl == '' || lastUrl != url) {
        lastUrl = url;
        if ((url.includes("https://www.openstreetmap.org/way/") || url.includes("https://www.openstreetmap.org/node/")
          || url.includes("https://www.openstreetmap.org/relation/")) && !(url.includes("#"))) {
          //sets all links to null 
          chrome.storage.local.set({ href_en: null });
          chrome.storage.local.set({ href_es: null });
          chrome.storage.local.set({ href_fr: null });
          chrome.storage.local.set({ href_de: null });
          chrome.storage.local.set({ href_ar: null });
          chrome.storage.local.set({ href_it: null });
          chrome.storage.local.set({ href_other: null });
          var links_found = false;
          chrome.pageAction.setPopup({
            tabId: tabId,
            popup: 'popup/popup_loading.html'
          });
          var pathArray = url.split('/'); // splits URL by slashes
          var locType = pathArray[3]; // way, relation or node
          var osm_id = pathArray[4]; // unique location identifier in OSM
          var osmData; // stores OSM data in JSON format
          var lat; // latitude
          var lon; // longitude
          var name; // location's name
          var latDiff; // difference between max lat and min lat
          var lonDiff; // difference between max lon and min lon
          var queryUrl = `https://overpass-api.de/api/interpreter?data=[out:json][timeout:25];${locType}(${osm_id});out tags bb;`;
          console.log("Querying Overpass... this may take a while");

          let req = await fetch(queryUrl);
          osmData = await req.json();

          console.log(osmData);
          var tags = osmData.elements[0].tags;
          var bounds = osmData.elements[0].bounds;
          if (tags['name:en'] != null) {
            name = tags['name:en'];
          }
          else {
            name = tags['name'];
          }
          console.log(name);
          if (name != null) {
            if (locType == 'way' || locType == 'relation') {
              lat = (bounds.minlat + bounds.maxlat) / 2;
              latDiff = Math.abs(bounds.minlat - bounds.maxlat);
              console.log(lat);
              lon = (bounds.minlon + bounds.maxlon) / 2;
              lonDiff = Math.abs(bounds.minlon - bounds.maxlon);
              console.log(lon);
              if (lonDiff < 0.5) {
                lonDiff = undefined;
              }
              if (latDiff < 0.5) {
                latDiff = undefined;
              }
            }
            else {
              lat = osmData.elements[0].lat;
              console.log(lat);
              lon = osmData.elements[0].lon;
              console.log(lon);
            }
            if (Object.keys(tags).includes("wikipedia")) {
              links_found = true;
              var wikiName = tags.wikipedia;
              console.log(wikiName);
              var lang = wikiName.split(":")[0];
              wikiName = wikiName.replace(/ /g, "%20");
              var link = `https://${lang}.wikipedia.org/wiki/${wikiName}?uselang=${lang}`;
              console.log("Found link in tags!");
              console.log(link);

              //sets cooresponding href to the link with the correct language
              if (lang == "en") {
                chrome.storage.local.set({ href_en: `https://${lang}.wikipedia.org/wiki/${wikiName}?uselang=${lang}` });
              }
              else if (lang == "es") {
                chrome.storage.local.set({ href_es: `https://${lang}.wikipedia.org/wiki/${wikiName}?uselang=${lang}` });
              }
              else if (lang == "fr") {
                chrome.storage.local.set({ href_fr: `https://${lang}.wikipedia.org/wiki/${wikiName}?uselang=${lang}` });
              }
              else if (lang == "de") {
                chrome.storage.local.set({ href_de: `https://${lang}.wikipedia.org/wiki/${wikiName}?uselang=${lang}` });
              }
              else if (lang == "ar") {
                chrome.storage.local.set({ href_ar: `https://${lang}.wikipedia.org/wiki/${wikiName}?uselang=${lang}` });
              }
              else if (lang == "it") {
                chrome.storage.local.set({ href_it: `https://${lang}.wikipedia.org/wiki/${wikiName}?uselang=${lang}` });
              }
              else {
                chrome.storage.local.set({ href_other: `https://${lang}.wikipedia.org/wiki/${wikiName}?uselang=${lang}` });
              }

              //gets list of names in selected languages

              var names = await getNames(name, lon, lat, lonDiff, latDiff);
              for (var i in names) {
                if (lang != names[i]["lang"]) { //prevents overwriting provided link from OSM
                  found = await langFunc(lat, lon, names[i]["name"], names[i]["lang"], lonDiff, latDiff);
                  if (found) { //prevents links_found from being changed back to false
                    links_found = true;
                  }
                }
              }
            }
            else {
              console.log("No link found in tags");
              names = await getNames(name, lon, lat, lonDiff, latDiff);
              for (var i in names) {
                found = await langFunc(lat, lon, names[i]["name"], names[i]["lang"], lonDiff, latDiff);
                if (found) {
                  links_found = true;
                }
              }
            }
          }
          else {
            console.log("This is not a named location!");
          }
          if (links_found) {
            console.log("Links were found!");
            chrome.pageAction.setPopup({
              tabId: tabId,
              popup: 'popup/popup.html'
            });
          } else {
            console.log("No links were found!");
            chrome.storage.local.set({ href_en: null });
            chrome.storage.local.set({ href_es: null });
            chrome.storage.local.set({ href_fr: null });
            chrome.storage.local.set({ href_de: null });
            chrome.storage.local.set({ href_ar: null });
<<<<<<< HEAD
=======
            chrome.storage.local.set({ href_it: null });
>>>>>>> 69c94edd057ade609d3158ffcf40be3021ed6f13
            chrome.storage.local.set({ href_other: null });
            chrome.pageAction.setPopup({
              tabId: tabId,
              popup: 'popup/popup_nolinks.html'
            });
          }
        }
      }
    });
  }
});
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.set({ href_en: null });
  chrome.storage.local.set({ href_es: null });
  chrome.storage.local.set({ href_fr: null });
  chrome.storage.local.set({ href_de: null });
  chrome.storage.local.set({ href_ar: null });
<<<<<<< HEAD
=======
  chrome.storage.local.set({ href_it: null });
>>>>>>> 69c94edd057ade609d3158ffcf40be3021ed6f13
  chrome.storage.local.set({ href_other: null });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'www.openstreetmap.org' },
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});