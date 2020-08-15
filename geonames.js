function getNames(placeName, lon, lat) {

    var url = "http://api.geonames.org/searchJSON?"

    var params = {
        q: "London",
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
            var places = response.geonames
            i = 0;
            found = false;
            for (i = 0; i < 10; i++) {
                this_lat = response.geonames.lat;
                this_lon = response.geonames.lng;
                if (this_lat - lat <= .1 && this_lat - lat >= -.1 || this_lon - lon <= .1 && this_lon - lon >= .1) {
                    found = true;
                    break;    
                }
            }
            if (!found) {
                //no corresponding entity on geonames, returns only english
                console.log(placeName)
            }
            var names = response.geonames[0].alternateNames; 
            for (i in names) {
                //returns english, french, german, italian, and preferred local tongue
                if (names[i]["lang"] == "en" || names[i]["lang"] == "fr" || names[i]["lang"] == "de" || names[i]["lang"] == "it" || names[i]["lang"] == "ar" || names[i]["isPreferredName"] == true) {
                    console.log(names[i]);}
                } 
            })
        .catch(function (error) { console.log(error); });
}

    