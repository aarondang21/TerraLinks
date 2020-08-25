// popup.js
chrome.storage.local.get(['href_en'], function(result) {
    if (result.href_en != null) {
        let oldDiv = document.getElementsByClassName("msgF")[0];
        let a = document.createElement('a');
        var linkText;
        linkText = document.createTextNode("English");
        a.appendChild(linkText);
        a.title = "en_Link";
        a.href = `${result.href_en}`;
        oldDiv.appendChild(a);
    }
});

chrome.storage.local.get(['href_fr'], function(result) {
    if (result.href_fr != null) {
        let oldDiv = document.getElementsByClassName("msgF")[0];
        let a = document.createElement('a');
        var linkText;
        linkText = document.createTextNode("French");
        a.appendChild(linkText);
        a.title = "fr_Link";
        a.href = `${result.href_fr}`;
        oldDiv.appendChild(a);
    }
});

chrome.storage.local.get(['href_de'], function(result) {
    if (result.href_de != null) {
        let oldDiv = document.getElementsByClassName("msgF")[0];
        let a = document.createElement('a');
        var linkText;
        linkText = document.createTextNode("German");
        a.appendChild(linkText);
        a.title = "de_Link";
        a.href = `${result.href_de}`;
        oldDiv.appendChild(a);
    }
});

chrome.storage.local.get(['href_es'], function(result) {
    if (result.href_es != null) {
        let oldDiv = document.getElementsByClassName("msgF")[0];
        let a = document.createElement('a');
        var linkText;
        linkText = document.createTextNode("Spanish");
        a.appendChild(linkText);
        a.title = "es_Link";
        a.href = `${result.href_es}`;
        oldDiv.appendChild(a);
    }
});

chrome.storage.local.get(['href_ar'], function(result) {
    if (result.href_ar != null) {
        let oldDiv = document.getElementsByClassName("msgF")[0];
        let a = document.createElement('a');
        var linkText;
        linkText = document.createTextNode("Arabic");
        a.appendChild(linkText);
        a.title = "ar_Link";
        a.href = `${result.href_ar}`;
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