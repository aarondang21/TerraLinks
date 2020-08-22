// popup.js
chrome.storage.local.get(['href_en'], function(result) {
    if (result.href_en != null) {
        let oldDiv = document.getElementsByClassName("msgF")[0];
        let a = document.createElement('a');
        var linkText;
        linkText = document.createTextNode("English");
        a.appendChild(linkText);
        a.title = "algLink";
        a.href = `${result.href_en}`;
        oldDiv.appendChild(a);
    }
});

chrome.storage.local.get(['href_fr'], function(result) {
    if (result.href_en != null) {
        let oldDiv = document.getElementsByClassName("msgF")[0];
        let a = document.createElement('a');
        var linkText;
        linkText = document.createTextNode("French");
        a.appendChild(linkText);
        a.title = "algLink";
        a.href = `${result.href_fr}`;
        oldDiv.appendChild(a);
    }
});

chrome.storage.local.get(['href_ge'], function(result) {
    if (result.href_en != null) {
        let oldDiv = document.getElementsByClassName("msgF")[0];
        let a = document.createElement('a');
        var linkText;
        linkText = document.createTextNode("German");
        a.appendChild(linkText);
        a.title = "algLink";
        a.href = `${result.href_ge}`;
        oldDiv.appendChild(a);
    }
});

chrome.storage.local.get(['href_es'], function(result) {
    if (result.href_en != null) {
        let oldDiv = document.getElementsByClassName("msgF")[0];
        let a = document.createElement('a');
        var linkText;
        linkText = document.createTextNode("Spanish");
        a.appendChild(linkText);
        a.title = "algLink";
        a.href = `${result.href_es}`;
        oldDiv.appendChild(a);
    }
});

chrome.storage.local.get(['href_ar'], function(result) {
    if (result.href_en != null) {
        let oldDiv = document.getElementsByClassName("msgF")[0];
        let a = document.createElement('a');
        var linkText;
        linkText = document.createTextNode("Arabic");
        a.appendChild(linkText);
        a.title = "algLink";
        a.href = `${result.href_ar}`;
        oldDiv.appendChild(a);
    }
});

chrome.storage.local.get(['href_other'], function(result) {
    if (result.href_en != null) {
        let oldDiv = document.getElementsByClassName("msgF")[0];
        let a = document.createElement('a');
        var linkText;
        linkText = document.createTextNode("Other Language");
        a.appendChild(linkText);
        a.title = "algLink";
        a.href = `${result.href_other}`;
        oldDiv.appendChild(a);
    }
});

/*
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
*/


document.getElementsByTagName("BODY")[0].onclick = function(e) {
    e = e || event
    var target = e.target || e.srcElement
    if (target.nodeName != 'A') return
    var href = target.href
    chrome.tabs.create({ url: href });
    return false;
}