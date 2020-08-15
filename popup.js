// popup.js
chrome.storage.local.get(['href1'], function(result) {
    if (result.href1 != null) {
        let oldDiv = document.getElementsByClassName("msgF")[0];
        let a = document.createElement('a');
        var linkText;
        linkText = document.createTextNode("English");
        a.appendChild(linkText);
        a.title = "algLink";
        a.href = `${result.href1}`;
        oldDiv.appendChild(a);
    }
});
chrome.storage.local.get(['href2'], function(result) {
    if (result.href2 != null) {
        let oldDiv = document.getElementsByClassName("msgF")[0];
        let a = document.createElement('a');
        var linkText;
        if (result.href2.includes("uselang=en")) {
            linkText = document.createTextNode("English");
        } else {
            linkText = document.createTextNode("Other language");
        }
        a.appendChild(linkText);
        a.title = "directLink";
        a.href = `${result.href2}`;
        oldDiv.appendChild(a);
    }
});

document.getElementsByTagName("BODY")[0].onclick = function(e) {
    e = e || event
    var target = e.target || e.srcElement
    if (target.nodeName != 'A') return
    var href = target.href
    chrome.tabs.create({ url: href });
    return false;
}