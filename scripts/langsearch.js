async function langFunc(latitude, longitude, placeName, lang = "en", lonDiff = 0.5, latDiff = 0.5) {

    if (lang == "en") {
        chrome.storage.local.set({ href_en: null });
    }
    else if (lang == "es") {
        chrome.storage.local.set({ href_es: null });
    }
    else if (lang == "fr") {
        chrome.storage.local.set({ href_fr: null });
    }
    else if (lang == "ge") {
        chrome.storage.local.set({ href_de: null });
    }
    else if (lang == "ar") {
        chrome.storage.local.set({ href_ar: null });
    }
    else {
        chrome.storage.local.set({ href_other: null });
    }

    //uses search call in wikipedia api to return list of possible locations
    var url1 = `https://${lang}.wikipedia.org/w/api.php`;

    var params1 = {
        action: "query",
        list: "search",
        srlimit: 20,
        srsearch: placeName,
        format: "json",
    };

    url1 = url1 + "?origin=*";
    Object.keys(params1).forEach(function (key) { url1 += "&" + key + "=" + params1[key]; });

    console.log("Finding matching names...");
    try {
        let response1 = await fetch(url1);
        let data1 = await response1.json();
        var pages1 = data1.query.search;
    }
    catch (err) {
        console.log("Invalid link, moving on...");
        return;
    }
    var status = false;

    for (var place in pages1) {

        //uses query with titles to filter by coordinates of possible locations
        var url2 = `https://${lang}.wikipedia.org/w/api.php`;
        id = pages1[place].pageid;

        var params2 = {
            action: "query",
            prop: "coordinates",
            titles: pages1[place].title,
            format: "json"
        };

        url2 = url2 + "?origin=*";
        Object.keys(params2).forEach(function (key) { url2 += "&" + key + "=" + params2[key]; });

        try {
            var response2 = await fetch(url2);
            var data2 = await response2.json();
        }
        catch (err) {
            console.log("Invalid link, moving on...");
            break;
        }
        console.log(data2.query.pages[id]);
        if (data2.query.pages[id] != null && Object.keys(data2.query.pages[id]).includes("coordinates")) {
            lat = data2.query.pages[id].coordinates[0].lat;
            lon = data2.query.pages[id].coordinates[0].lon;
            console.log(lat);
            console.log(lon);
            if ((lat - latitude <= latDiff && lat - latitude >= -latDiff) && (lon - longitude <= lonDiff && lon - longitude >= -lonDiff)) {

                console.log(`http://${lang}.wikipedia.org/?curid=` + id);
                status = true;

                if (lang == "en") {
                    chrome.storage.local.set({ href_en: `http://${lang}.wikipedia.org/?curid=` + id });
                }
                else if (lang == "es") {
                    chrome.storage.local.set({ href_es: `http://${lang}.wikipedia.org/?curid=` + id });
                }
                else if (lang == "fr") {
                    chrome.storage.local.set({ href_fr: `http://${lang}.wikipedia.org/?curid=` + id });
                }
                else if (lang == "de") {
                    chrome.storage.local.set({ href_de: `http://${lang}.wikipedia.org/?curid=` + id });
                }
                else if (lang == "ar") {
                    chrome.storage.local.set({ href_ar: `http://${lang}.wikipedia.org/?curid=` + id });
                }
                else {
                    chrome.storage.local.set({ href_other: `http://${lang}.wikipedia.org/?curid=` + id });
                }

                break;
            }
        }
    }
    if (status) {
        console.log("Langsearch found link!")
    }
    return status;
}