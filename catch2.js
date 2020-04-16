//https://stackoverflow.com/questions/41068295/electron-prevent-cancel-page-navigation
//may need above for future reference for blocking off sites in database

//need to filter out all background connections
//ex. https://ssl.gstatic.com/docs/common/netcheck.gif* --> find way to get wildcards to work
//maybe something like url.include("ssl.gstatic.com") === 0? --> may need import though

var url = "https://chrispence.me";

//we're running an O(N + M) solution here since we dont know the import
function url_filter(url, check) {

    var x;
    for (x = 0; x < (url.length - check.length + 1); x++) {
        //console.log();
        if (url[x] === check[0]) {
            var y;
            let cont = 1;
            for (y = 0; y < check.length; y++) {
                if (url[x + y] !== check[y]) {
                    cont = 0;
                    break;
                }
            }
            if (cont === 1) {
                //console.log("this is a match");
                return true;
            }
        }
    }
    //console.log("not a match");
    return false;

}

chrome.webRequest.onBeforeRequest.addListener(function (details) {
    // var urlwork = ""
    // chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {urlwork = tabs[0].url;});
    // console.log(urlwork);
    // console.log("hererererer3er");

    if ((details.type === "main_frame") && (details.url != 'https://chrispence.me') && (details.url != url) && (url_filter(details.url, "chrome-extension:") === false)) {

        var GOOD = 0; BAD = 1; STILLPROCESSING = 2;

        fetch("http://chrispence.me/secondchance?url=" + details.url).then(function (response) {
            return response.json();
        }).then(function (parsedJson) {
            console.log(parsedJson);

            if (parsedJson["success"] === true) {
                if (parsedJson["safe"] === true) {
                    url = details.url;
                    chrome.tabs.update({ url: details.url });
                } else {

                    if (confirm("Do you want to continue?")) {
                        //Continue
                        url = details.url;
                        chrome.tabs.update({ url: details.url });
                    } else {
                        //Do not continue
                        chrome.tabs.update({ url: url });
                    }
                    
                }

            } else {
                url = details.url;
                chrome.tabs.update({ url: details.url });
            };



        });


        //do something with data:
    }
},
    {urls: ["<all_urls>"]
}, ["blocking"]);



