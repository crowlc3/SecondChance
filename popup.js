// $(function(){
//   $('#name').keyup(function(){
//     $('#greet').text('Hello Bitch' + $('#name').val());
//   })
// });

/*$(function(){
	$('#whitelistlink').click(function(){
		chrome.storage.sync.get('link',function(linky){
			//var linkadd = $('#linkadd').val();
			//$('#link').text(linkadd);
			var l = $('#l').val();
			chrome.storage.sync.set({'link': l});
			$('#link').text(l);
			$('#l').val('');
		});
	});
});*/



// document.addEventListener('DOMContentLoaded', function() {
//   var checkPageButton = document.getElementById('checkPage');
//   checkPageButton.addEventListener('click', function() {

//     chrome.tabs.getSelected(null, function(tab) {
//       d = document;

//       var f = d.createElement('form');
//       f.action = 'http://gtmetrix.com/analyze.html?bm';
//       f.method = 'post';
//       var i = d.createElement('input');
//       i.type = 'hidden';
//       i.name = 'url';
//       i.value = tab.url;
//       f.appendChild(i);
//       d.body.appendChild(f);
//       f.submit();
//     });
//   }, false);
// }, false);


$(function(){

    chrome.storage.sync.get(['link'],function(linkEnter){
        $('#link').text(linkEnter.link);
    });

    $('#whiteList').click(function(){
        chrome.storage.sync.get(['link'],function(linkEnter){
            var linky = $('#linky').val();
            var newLink = linky;

            chrome.storage.sync.set({'link': newLink});


            $('#link').text(newLink);
            $('#linky').val('');
        });
    });
});