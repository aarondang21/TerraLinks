function geoFunc() {

    var coordinates = document.getElementById("coords");
    //console.log(coordinates.elements[0].value);
    //console.log(coordinates.elements[1].value);

    var lat = coordinates.elements[0].value;
    var long = coordinates.elements[1].value;
    let position = lat + "|" + long;

    //console.log(position);

    var url = "https://en.wikipedia.org/w/api.php";

    var params = {
        action: "query",
        list: "geosearch",
        gscoord: position,
        gsradius: "10000",
        gslimit: "10",
        format: "json",
    }; 

    url = url + "?origin=*";
    Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });

    //console.log(url);

    fetch(url)
        .then(function (response) { return response.json(); })
        .then(function (response) {
            var pages = response.query.geosearch;
            for (var place in pages) {
                console.log(pages[place].title);
                console.log("http://en.wikipedia.org/?curid=" + pages[place].pageid);
            }
        })
        .catch(function (error) { console.log(error); });
}