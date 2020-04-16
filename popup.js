$(function(){

    var list = [];

    chrome.storage.local.get('link',function(linkEnter){
        $('#link').text(linkEnter.link);
    });


    chrome.storage.local.get(null,function(returnback){
        console.log(returnback);
    });

    $('#whiteList').click(function(){
        chrome.storage.local.get(['link'],function(linkEnter){
            var linky = $('#linky').val();
            var newLink = linky;
            /*sanitizeURL(linky, (cleanURL));
            var newLink = cleanURL;*/
            list.push(linky);
            console.log(list);

            chrome.storage.local.set({'link': list});


            $('#link').text(newLink);
            $('#linky').val('');
        });
    });
});


/*// Ensure that a URL provided is real and in the right form
function sanitizeURL(url, callback){
    callback(
        url.replace(
            new RegExp('^http://', ''), ''
        ).replace(
            new RegExp('^https://', ''), ''
        ).split('/')[0]
    );
}*/