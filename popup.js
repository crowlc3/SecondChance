$(function whitelist(){

    chrome.storage.local.get(['link'],function(linkEnter){
        $('#link').text(linkEnter.link);
    });

    $('#whiteList').click(function(){
        chrome.storage.local.get(['link'],function(linkEnter){
            var linky = $('#linky').val();
            var newLink = linky;

            chrome.storage.local.set({'link': newLink});


            $('#link').text(newLink);
            $('#linky').val('');
        });
    });
});