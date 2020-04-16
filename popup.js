$(function(){

    chrome.storage.local.get(['link'],function(linkEnter){
        $('#link').text(linkEnter.link);


        var fs = require('fs')
        fs.appendFile('log.txt', 'new data', function (err) {
          if (err) {
            // append failed
          } else {
            // done
          }
        })

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