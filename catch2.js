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
        var jsonObj;

        // var reqMade = $.get("chrispence.me/secondchance?url=" + url, {})
        //                 .done(function( data ) { 
        //                     alert("Data Loaded: " + data); 
        //                 });

        fetch("http://chrispence.me/secondchance?url=" + url).then( function(response) {
            return response.json();
        }).then(function(parsedJson) {
            console.log('This is the parsed json', parsedJson["success"]);
        })
        
        //do something with data:
    }
},
    {urls: ["<all_urls>"]
}, ["blocking"]);
