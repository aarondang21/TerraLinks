async function langFunc(latitude, longitude, placeName, lang = "en") {

    //test
    //placeName = "لندن";
    //lang = "ar";
    //placeName = "London";
    //lang = "en"
    //latitude = 51.5074;
    //longitude = -.1278;

    if (lang == "en") {
        chrome.storage.local.set({href_en: null});
    }
    else if (lang == "es") {
        chrome.storage.local.set({href_es: null});
    }
    else if (lang == "fr") {
        chrome.storage.local.set({href_fr: null});
    }
    else if (lang == "ge") {
        chrome.storage.local.set({href_de: null});
    }
    else if (lang == "ar") {
        chrome.storage.local.set({href_ar: null});
    }
    else {
        chrome.storage.local.set({href_other: null});
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
    let response1 = await fetch(url1);
    let data1 = await response1.json();
    var pages1 = data1.query.search;
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
        Object.keys(params2).forEach(function(key){url2 += "&" + key + "=" + params2[key];});

        let response2 = await fetch(url2);
        let data2 = await response2.json();
        console.log(data2.query.pages[id]);
        if (Object.keys(data2.query.pages[id]).includes("coordinates")) {
            lat = data2.query.pages[id].coordinates[0].lat;
            lon = data2.query.pages[id].coordinates[0].lon;
            console.log(lat);
            console.log(lon);
            if ((lat - latitude <= 0.5 && lat - latitude >= -0.5) && (lon - longitude <= 0.5 && lon - longitude >= -0.5)) {
                
                console.log(`http://${lang}.wikipedia.org/?curid=` + id);
                status = true;
                
                if (lang == "en") {
                    chrome.storage.local.set({href_en: `http://${lang}.wikipedia.org/?curid=` + id});
                }
                else if (lang == "es") {
                    chrome.storage.local.set({href_es: `http://${lang}.wikipedia.org/?curid=` + id});
                }
                else if (lang == "fr") {
                    chrome.storage.local.set({href_fr: `http://${lang}.wikipedia.org/?curid=` + id});
                }
                else if (lang == "de") {
                    chrome.storage.local.set({href_de: `http://${lang}.wikipedia.org/?curid=` + id});
                }
                else if (lang == "ar") {
                    chrome.storage.local.set({href_ar: `http://${lang}.wikipedia.org/?curid=` + id});
                }
                else {
                    chrome.storage.local.set({href_other: `http://${lang}.wikipedia.org/?curid=` + id});
                }

                break;
            }
        }
    }   
    if(status) {
        console.log("langsearch found link!")
    }

    else {
        //console.log("No links found!");
    }
    return status;
}