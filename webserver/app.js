// Second Chance Module File
// SDD 2020

// This next section contains the portion of my webserver that handles the requests and directs them to this file
/*
// Second chance app for SDD
app.get('/secondchance', function(req,res){
  if(req.query.url == null){
    res.status(400);
    res.send("Invalid request.");
  }
  else{
    secondchance.checkLink(req.query.url, function(url_status){
      res.status(200);
      res.send(url_status);
    });
  }
});
*/

// This portion handles the redirected requests from my webserver
exports.checkLink = function(url, callback){
	callback(url);
}