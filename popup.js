// $(function(){
//   $('#name').keyup(function(){
//     $('#greet').text('Hello Bitch' + $('#name').val());
//   })
// });

/*$(function(){
	$('#whitelistlink').click(function(){
		chrome.storage.sync.get('total',function(linky){
			//var linkadd = $('#linkadd').val();
			//$('#total').text(linkadd);
			var l = $('#l').val();
			chrome.storage.sync.set({'total': l});
			$('#total').text(l);
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

    chrome.storage.sync.get(['total'],function(budget){
        $('#total').text(budget.total);
    });

    $('#spendAmount').click(function(){
        chrome.storage.sync.get(['total'],function(budget){
            var newTotal = 0;
            if (budget.total){
                newTotal =budget.total;
            }

            var amount = $('#amount').val();
            if (amount){
                newTotal = amount;
            }

            $('#total').text(newTotal);
            $('#amount').val('');

           

        });
    });
});