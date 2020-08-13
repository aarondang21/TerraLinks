// popup.js
chrome.storage.local.get(['href1'], function(result) {
    if (result.href1 != null) {
        let div = document.createElement('div');
        div.id = 'algLink';
        div.innerHTML = `<a href="${result.href1}>link text</a>';`
        document.body.appendChild(div);
    }
});
chrome.storage.local.get(['href2'], function(result) {
    if (result.href2 != null) {
        let div = document.createElement('div');
        div.id = 'directLink';
        div.innerHTML = `<a href="${result.href2}>link text</a>';`
        document.body.appendChild(div);
    }
});