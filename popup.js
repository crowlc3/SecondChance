$(function(){

    var list = [];

    var url = "https://chrispence.me";

    chrome.storage.local.get("link", function(linkEnter) {
        $("#link").text(linkEnter.link);
    });
    
    /*Print the link last entered*/
    $("#whiteList").click(function() {
        chrome.storage.local.get(["link"], function(linkEnter) {
            var linky = $("#linky").val();
            var newLink = linky;

            /*Retrieve entered link*/
            chrome.storage.local.set({"link": linky});
            
            /*Store link*/
            fetch(url + "/sddupdate?url=" + linky);

            /*Add link to whitelist*/
            $("#link").text(newLink);
            $("#linky").val("");

        });
    });
});