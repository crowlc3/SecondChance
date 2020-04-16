/*var win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=350,height=150,top="+(screen.height-800)+",left="+(screen.width-500));
win.document.body.innerHTML =''+
    '<body style = "background-color:red;">'+
        '<p>We found this link to be __% Malicious</p>'+
        '<p>Would You Like To Continue?</p>'+
		'<button type = "button">Yes</button>'+
		'<button type = "button">Nop</button>'+
    '</body>';*/

/*//function myFunction() {
  var txt;
  if (confirm("Press a button!")) {
    txt = "You pressed OK!";
  } else {
    txt = "You pressed Cancel!";
  }
  document.getElementById("demo").innerHTML = txt;
//}*/


document.body.addEventListener("click", function(e) {
	if(e.target && e.target.nodeName == "A") {
		var txt;
		  if (confirm("Do you want to continue?")) {
		    txt = "You pressed OK!";
		  } else {
		    txt = "You pressed Cancel!";
		  }
		  document.getElementById("demo").innerHTML = txt;
	}
});