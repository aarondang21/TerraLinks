// content.js
// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         if (request.message === "foundWiki") {
//             // Get all  links in the code
//             var links = document.getElementsByTagName("a")
//             // Loop over all links
//             for (var i = 0; i < links.length; i++) {
//                 // Check if the search string is found in the href of the link
//                 if (links[i].getAttribute("href").indexOf("wikipedia") != -1) {
//                     // Set it to the return value
//                     url = links[i].getAttribute("href");
//                     // stop looping
//                     break;
//                 }
//             }
//             chrome.runtime.sendMessage({ "message": "foundLink", "url": href });
//         }
//     }
// );