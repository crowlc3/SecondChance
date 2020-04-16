function load() {
    var links = "";
    chrome.storage.local.get('link', function (result) {
        links = result.links;
        alert(result.links);
        alert(JSON.stringify(result));
        $("#link").val(links);
    });
}