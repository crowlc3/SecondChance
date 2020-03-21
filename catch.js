//https://stackoverflow.com/questions/41068295/electron-prevent-cancel-page-navigation
//may need above for future reference for blocking off sites in database

//need to filter out all background connections
//ex. https://ssl.gstatic.com/docs/common/netcheck.gif* --> find way to get wildcards to work
//maybe something like url.include("ssl.gstatic.com") === 0? --> may need import though

var url = "";
var analysis_running = 0;

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
    
    if (url !== details.url && details.type === "main_frame") {

        url = details.url;
        console.log(url);

        // this will check if the url contains a certain substring in the url
        if (url_filter(url, "ssl.gstatic")) {
            //console.log("echoing the skip");
            return;
        }

        /*
        analysis_running = 1;
        //call url analysis
        if (analysis_running ) {

        }
        */

        //silently block redirect from occuring
        //return { redirectUrl: "javascript:" };
    }

},
    {urls: ["<all_urls>"]
}, ["blocking"]);
