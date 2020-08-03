// background.js
// *IMPORTANT* Use:
// chrome.storage.local.set({'links_found': true});
// For when we find links in the algorithm
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    var links_found = false;
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      let url = tabs[0].url;
      if ((url.includes("https://www.openstreetmap.org/way/") || url.includes("https://www.openstreetmap.org/node/")
        || url.includes("https://www.openstreetmap.org/relation/")) && !(url.includes("#"))) {
        var pathArray = url.split('/'); // splits URL by slashes
        var locType = pathArray[3]; // way, relation or node
        var osm_id = pathArray[4]; // unique location identifier in OSM
        var osmData; // stores OSM data in JSON format
        var lat; // latitude
        var lon; // longitude
        var name // location's name
        var queryUrl = `https://overpass-api.de/api/interpreter?data=[out:json][timeout:25];${locType}(${osm_id});out tags bb;`;
        console.log("Querying Overpass... this may take a while");
        const req = new XMLHttpRequest();
        req.open("GET", queryUrl, true);
        req.responseType = 'json';
        req.send();
        req.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            osmData = req.response;
            console.log(osmData);
            var tags = osmData.elements[0].tags;
            var bounds = osmData.elements[0].bounds;
            // The following lines gather name, longitude and latidude from OSM JSON
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
                console.log(lat);
                lon = (bounds.minlon + bounds.maxlon) / 2;
                console.log(lon);
              }
              else {
                lat = osmData.elements[0].lat;
                console.log(lat);
                lon = osmData.elements[0].lon;
                console.log(lon);
              }
              if (tags.place == 'city' || tags.type == 'boundary') {
                links_found = searchFunc(lat, lon, name);
              }
              else {
                links_found = geoFunc(lat, lon, name);
              }
            }
            else {
              console.log("This is not a named location!");
            }
            if (links_found) {
              chrome.pageAction.setPopup({
                tabId: tabId,
                popup: 'popup.html'
              });
            } else {
              chrome.pageAction.setPopup({
                tabId: tabId,
                popup: 'popup_nolinks.html'
              });
            }
          }
        }
      }
    });
  }
});
chrome.runtime.onInstalled.addListener(function () {
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