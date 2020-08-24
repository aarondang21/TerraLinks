async function getNames(placeName, lon, lat) {

    var url = "http://api.geonames.org/searchJSON?"

    //test
    //placeName = "London"
    //lat = 51.5074
    //lon = -0.1278

    var params = {

        q: placeName,
        maxRows: "10",
        lang: "en",
        username: "aarondang1111",
        style: "full"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });

    //console.log(url);

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
        if (this_lat - lat <= .5 && this_lat - lat >= -.5 || this_lon - lon <= .5 && this_lon - lon >= .5) {
            allNames = data.geonames[j].alternateNames;
            found = true;
            break;    
        }
        j++;
    }
    if (!found) {
        //no corresponding entity on geonames, returns only english
        console.log("no alternate names found...");
        oneName = {name: placeName, lang: "en"}
        console.log(oneName);
        names.push(oneName);
    }
    else {
        console.log("list of alternate names found...");
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

    