function getNames(placeName, lon, lat) {

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

    console.log(url);

    fetch(url)
        .then(function (response) {
            return response.json(); 
            console.log(response);})
        .then(function (response) {
            var places = response.geonames; //list of possible locations

            console.log(places);

            var allNames; //list of names of identified location in different languages
            var names = []; //list of selected names (english, french, german, italian, and local tongue)
            i = 0;
            var found = false;
            for (j = 0; j < 10; j++) {
                this_lat = places[j].lat;
                this_lon = places[j].lng;
                if (this_lat - lat <= .5 && this_lat - lat >= -.5 || this_lon - lon <= .5 && this_lon - lon >= .5) {
                    allNames = response.geonames[j].alternateNames;
                    found = true;
                    break;    
                }
            }
            if (!found) {
                //no corresponding entity on geonames, returns only english
                console.log("no alternate names found...");
                console.log(placeName);
                names.push(placeName);
            }
            else {
                console.log("list of alternate names found...");
                for (i in allNames) {
                    //returns english, french, german, italian, and preferred local tongue
                    if (allNames[i]["lang"] == "en" || allNames[i]["lang"] == "fr" || allNames[i]["lang"] == "de" || allNames[i]["lang"] == "it" || allNames[i]["lang"] == "ar" || allNames[i]["isPreferredName"] == true) {
                        console.log(allNames[i]);
                        names.push(allNames[i]);
                    }
                }
            }
            return names; 
        })
        .catch(function (error) { console.log(error); });
}

    