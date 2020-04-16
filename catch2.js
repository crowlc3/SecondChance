//https://stackoverflow.com/questions/41068295/electron-prevent-cancel-page-navigation
//may need above for future reference for blocking off sites in database

//need to filter out all background connections
//ex. https://ssl.gstatic.com/docs/common/netcheck.gif* --> find way to get wildcards to work
//maybe something like url.include("ssl.gstatic.com") === 0? --> may need import though

var url = "https://chrispence.me";

chrome.webRequest.onBeforeRequest.addListener(function (details) {
    // var urlwork = ""
    // chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {urlwork = tabs[0].url;});
    // console.log(urlwork);
    // console.log("hererererer3er");

    if (details.type === "main_frame" && details.url != 'https://chrispence.me' && details.url != url) {

        var GOOD = 0; BAD = 1; STILLPROCESSING = 2;

        fetch("http://chrispence.me/secondchance?url=" + details.url).then( function(response) {
            return response.json();
        }).then(function(parsedJson) {
            console.log(parsedJson);

            if (confirm("Do you want to continue?")) {
        //Continue
        } else {
        //Do not continue
        }
            
            if(parsedJson["success"] === true) {
                if (parsedJson["safe"] === true) { 
                    url = details.url;
                    chrome.tabs.update({url: details.url});
                } else {
                    chrome.tabs.update({ url: url });
                }
                
            } else {
                url = details.url;
                chrome.tabs.update({url: details.url});
            };



        });

        
        //do something with data:
    }
},
    {urls: ["<all_urls>"]
}, ["blocking"]);



