//https://stackoverflow.com/questions/41068295/electron-prevent-cancel-page-navigation
//may need above for future reference for blocking off sites in database

//need to filter out all background connections
//ex. https://ssl.gstatic.com/docs/common/netcheck.gif* --> find way to get wildcards to work
//maybe something like url.include("ssl.gstatic.com") === 0? --> may need import though

var url = "";
var analysis_running = 0;

chrome.webRequest.onBeforeRequest.addListener(function (details) {
    
    if (details.type === "main_frame") {

        url = details.url;
        console.log(url);
        var GOOD = 0; BAD = 1; STILLPROCESSING = 2;

        var hmm = fetch("http://chrispence.me/secondchance?url=" + url).then( function(response) {
            return response.json();
        }).then(function(parsedJson) {
            console.log(parsedJson)
            return parsedJson
        })
        console.log("work bitcvh");
        console.log(hmm);
        
        if(hmm["success"] === true) {
            if(hmm["safe"] === true) { return  {redirectUrl: url}}
            else {return { redirectUrl: "javascript:" };}
        } else {

            return  {redirectUrl: url};
        }
        //do something with data:
    }
},
    {urls: ["<all_urls>"]
}, ["blocking"]);



            if(parsedJson["success"] === true) {
                if(parsedJson["safe"] === true) { return  {redirectUrl: url}}
                else {}
            } else {

                return  {redirectUrl: url};
            }