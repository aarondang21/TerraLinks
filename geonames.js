function getNames(placeName) {

   var url = "http://api.geonames.org/searchJSON?"

    var params = {
        q: "placeName",
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
            return response.json(); })
        .then(function (response) {
            console.log(response.geonames[0].alternateNames); })
        .catch(function (error) { console.log(error); });
}

    