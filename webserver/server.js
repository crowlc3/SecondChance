// Second Chance Standalone Webserver File
// SDD 2020

const express = require('express');
const app = express();
require('dotenv').config();

const secondchance = require('./app.js');

const port_http = process.env.PORT_HTTP;

// Route /secondchance requests
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

// Route /sddupdate requests
app.get('/sddupdate', function(req,res){
  secondchance.updateLink(req.query.url, (status) => {
    res.send(status);
  });
});

app.listen(port_http, function() {
  console.log('Express HTTP server listening on port ' + port_http);
});