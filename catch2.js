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

chrome.webRequest.onBeforeRequest.addListener(function (details) {
    
    if ((details.type === "main_frame") && (details.url !== 'https://chrispence.me') && (details.url !== url) && (url_filter(details.url, "chrome-extension:") === false) && (url_filter(details.url, url) === false)) {

        fetch("http://chrispence.me/secondchance?url=" + details.url).then(function (response) {
            return response.json();
        }).then(function (parsedJson) {
            console.log(parsedJson);

            if (parsedJson["success"] === true) {
                if (parsedJson["safe"] === true) {
                    setTimeout(function () {
                        url = details.url;
                        chrome.tabs.update({ url: details.url });
                    }, 300);
                } else {

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


        //do something with data:
    }
},
    {urls: ["<all_urls>"]
}, ["blocking"]);



