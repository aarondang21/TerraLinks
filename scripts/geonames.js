async function getNames(placeName, lon, lat, lonDiff = 0.5, latDiff = 0.5) {

    var url = "http://api.geonames.org/searchJSON?"

    var params = {

        q: placeName,
        maxRows: "10",
        lang: "en",
        username: "aarondang1111",
        style: "full"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });

    let response = await fetch(url);
    let data = await response.json();
    var places = data.geonames; //list of possible locations

    console.log(places);

    var allNames = []; //list of names of identified location in different languages
    var names = []; //list of selected names (english, french, german, italian, and local tongue)
    var found = false;
    j = 0;
    while (j < 10 && j < places.length) {
        this_lat = places[j].lat;
        this_lon = places[j].lng;
        if (this_lat - lat <= latDiff && this_lat - lat >= -latDiff || this_lon - lon <= lonDiff && this_lon - lon >= -latDiff) {
            allNames = data.geonames[j].alternateNames;
            found = true;
            break;    
        }
        j++;
    }
    if (!found) {
        //no corresponding entity on geonames, returns only english
        console.log("No alternate names found...");
        oneName = {name: placeName, lang: "en"}
        console.log(oneName);
        names.push(oneName);
    }
    else {
        console.log("List of alternate names found...");
        for (i in allNames) {
            //returns english, french, german, italian, and preferred local tongue
            if (allNames[i]["lang"] == "en" || allNames[i]["lang"] == "fr" || allNames[i]["lang"] == "de" || allNames[i]["lang"] == "es" || allNames[i]["lang"] == "ar" || allNames[i]["isPreferredName"] == true) {
                console.log(allNames[i]);
                names.push(allNames[i]);
            }
        }
    }
    console.log(names);
    return names;
}

    