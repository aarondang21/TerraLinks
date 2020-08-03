function searchFunc(latitude, longitude, placeName) {

    var url = "https://en.wikipedia.org/w/api.php";

    var params = {
        action: "query",
        list: "search",
        srsearch: placeName,
        format: "json"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });

    const data = new XMLHttpRequest();
    data.open("GET", url, true);
    data.responseType = 'json';
    data.send();
    return data.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var pages = data.response.query.search;
            for (var place in pages) {
                name = pages[place].title;
                id = pages[place].pageid;
                url2 = `https://en.wikipedia.org/w/api.php?action=query&prop=coordinates&titles=${name}&format=json`
                const data2 = new XMLHttpRequest();
                data2.open("GET", url2, true);
                data2.responseType = 'json';
                data2.send();
                return data2.onreadystatechange = function (id) {
                    if (this.readyState == 4 && this.status == 200) {
                        keys = Object.keys(id.currentTarget.response.query.pages);
                        id = keys[0];
                        if (Object.keys(data2.response.query.pages[id]).includes("coordinates")) {
                            lat = data2.response.query.pages[id].coordinates[0].lat;
                            lon = data2.response.query.pages[id].coordinates[0].lon;
                            if ((lat - latitude <= 0.1 && lat - latitude >= -0.1) || lon - longitude <= 0.1 && lon - longitude <= -0.1) {
                                console.log("http://en.wikipedia.org/?curid=" + id);
                                return true;
                            }
                        }
                    }
                }
            }
        }
    }
}