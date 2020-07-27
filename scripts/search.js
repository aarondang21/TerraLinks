var url = "https://en.wikipedia.org/w/api.php";

var params = {
    action: "query",
    list: "search",
    srsearch: "Washington Monument",
    format: "json"
};

url = url + "?origin=*";
Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });
