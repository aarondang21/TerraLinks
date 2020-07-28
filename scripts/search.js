function searchFunc() {

    var url = "https://en.wikipedia.org/w/api.php";

    var data = document.getElementById("name").value;

    var params = {
        action: "query",
        list: "search",
        srsearch: data,
        format: "json"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });

    fetch(url)
        .then(function (response) { return response.json(); })
        .then(function (response) {
            var pages = response.query.search;
            for (var place in pages) {
                console.log(pages[place].title);
                console.log("http://en.wikipedia.org/?curid=" + pages[place].pageid);
            }
        })
        .catch(function (error) { console.log(error); });
}