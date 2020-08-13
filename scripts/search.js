async function searchFunc(latitude, longitude, placeName) {

    var url = "https://en.wikipedia.org/w/api.php";
    chrome.storage.local.set({href1: null});

    var params = {
        action: "query",
        list: "search",
        srlimit: 50,
        srsearch: placeName,
        format: "json"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });

    console.log("Querying Wikipedia...");
    let response = await fetch(url);
    let data = await response.json();
    var pages = data.query.search;
    var status = false;
    
    for (var place in pages) {
        name = pages[place].title;
        id = pages[place].pageid;
        url2 = `https://en.wikipedia.org/w/api.php?action=query&prop=coordinates&titles=${name}&format=json`
        let response2 = await fetch(url2);
        let data2 = await response2.json();
        console.log(data2.query.pages[id]);
        if (Object.keys(data2.query.pages[id]).includes("coordinates")) {
            lat = data2.query.pages[id].coordinates[0].lat;
            lon = data2.query.pages[id].coordinates[0].lon;
            if ((lat - latitude <= 0.5 && lat - latitude >= -0.5) && (lon - longitude <= 0.5 && lon - longitude >= -0.5)) {
                console.log("http://en.wikipedia.org/?curid=" + id);
                status = true;
                chrome.storage.local.set({href1: "http://en.wikipedia.org/?curid=" + id});
                break;
            }
        }
    }
    if(!status) {
        console.log("No links found!");
    }
    return status;
}