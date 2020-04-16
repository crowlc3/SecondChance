//https://stackoverflow.com/questions/41068295/electron-prevent-cancel-page-navigation
//may need above for future reference for blocking off sites in database

//need to filter out all background connections
//ex. https://ssl.gstatic.com/docs/common/netcheck.gif* --> find way to get wildcards to work
//maybe something like url.include("ssl.gstatic.com") === 0? --> may need import though

var url = "https://chrispence.me";

//we're running an O(N + M) solution here since we dont know the import
//For link comparison
//More robust string comparison (substring), 
//where link may be the same but with https added or www left out etc.
function url_filter(url, check) {

    var x;
    for (x = 0; x < (url.length - check.length + 1); x++) {
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
                return true;
            }
        }
    }
    return false;

}

//When a link is clicked and before it loads, this function will run
//This function is intended to either block and redirect you to safety or allow you to continue to a safe website
chrome.webRequest.onBeforeRequest.addListener(function (details) {
    // Initial Check: if our type is main_frame and our clicked on link is not chris' website,
    // the chrome extension, or the previously analyzed link, then run risk analysis and response
    if ((details.type === "main_frame") && (details.url !== 'https://chrispence.me') && (details.url !== url) && (url_filter(details.url, "chrome-extension:") === false) && (url_filter(details.url, url) === false)) {
        // fetch the link risk analysis from app.js being served through chris' website
        fetch("http://chrispence.me/secondchance?url=" + details.url).then(function (response) {
            return response.json();
        }).then(function (parsedJson) {
            console.log(parsedJson);
            // if the analysis was a success then proceed
            if (parsedJson["success"] === true) {
                // if the link was deemed safe then continue to the link
                if (parsedJson["safe"] === true) {
                    setTimeout(function () {
                        url = details.url;
                        chrome.tabs.update({ url: details.url });
                    }, 300);
                } else {
                    // if link was deemed unsafe, proc caitlin's popup where a user response will be needed
                    // if user wishes to continue, go in to if statement and navegate to link
                    // if user does not wish to continue, go into else statements where user will be sent to chris' website
                    if (confirm("Do you want to continue?")) {
                        //Continue
                        setTimeout(function () {
                            url = details.url;
                            chrome.tabs.update({ url: details.url });
                        }, 300);
                    } else {
                        //Do not continue
                        setTimeout(function () {
                            chrome.tabs.update({ url: url });
                        }, 300);
                    }
                    
                }

            }  
        });
    }
},
    {urls: ["<all_urls>"]
}, ["blocking"]);



