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

            chrome.storage.local.set({'link': linky});

            fetch("https://chrispence.me/sddupdate?url=" + linky);


            $('#link').text(newLink);
            $('#linky').val('');
        });
    });
});