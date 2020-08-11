function geoFunc(latitude, longitude, placeName) {

    let position = latitude + "|" + longitude;

    var url = "https://en.wikipedia.org/w/api.php";

    var params = {
        action: "query",
        list: "geosearch",
        gscoord: position,
        gsradius: "10000",
        gslimit: "500",
        format: "json",
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });

    console.log("Querying Wikipedia...");
    return fetch(url)
        .then(function (response) { return response.json(); })
        .then(function (response) {
            var pages = response.query.geosearch;
            for (var place in pages) {
                name = pages[place].title;
                if (name == placeName) {
                    console.log("http://en.wikipedia.org/?curid=" + pages[place].pageid);
                    return true;
                }
            }
            console.log("No links match!");
            return false;
        })
        .catch(function (error) { console.log(error); });
}