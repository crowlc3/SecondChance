// JavaScript source code
/*var cancel = function (details) {
    console.log("please oh please i beg of you please print in the console i beg of you kind sir");
};*/
/*
chrome.webRequest.onBeforeRequest.addListener(function (details) {
    console.log("please oh please i beg of you please print in the console i beg of you kind sir");
    chrome.tabs.sendMessage(details.tabId, { "message": details.url }, function (response) { });
});

chrome.webRequest.onBeforeRedirect.addListener(function (details) {
    console.log("This is a redirect");
    chrome.tabs.sendMessage(details.tabId, { "message": details.url }, function (response) { });
});*/

var callback = function (details) {
    console.log("redirect caught!");
};

chrome.webRequest.onBeforeRedirect.addListener(callback);