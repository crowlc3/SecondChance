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

/*
Responses to client should return JSON structure like such:

{
	success: true,
	url: "google.com"
	score: 0,
	safe: true
}

*/

// Pull in variables from the environment
require('dotenv').config();

// Connect to the database
const { Client } = require('pg');
const client = new Client({
  host: process.env.SDD_DB_HOST,
  port: process.env.SDD_DB_PORT,
  user: process.env.SDD_DB_USER,
  password: process.env.SDD_DB_PASS,
  database: process.env.SDD_DB_DATA,
  query_timeout: 2000
});

client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

// This portion handles the redirected requests from my webserver
exports.checkLink = function(url, callback){
	addToMaster(url, 0, true);

	callback({
		success: true,
		url: url,
		score: 0,
		safe: true
	});


	// Virus Total
	// Listen for error code 429

}

function makeAPICall(){

}

// Read the top most item from the queue
function readQueue(){
	client.query('SELECT url FROM queue ORDER BY date_added ASC LIMIT 1;', (err, res) => {
		if(err){
			console.log(err.stack);
			return null;
		}
		else{
			console.log(res.rows[0]);
			return res.rows[0];
		}
	});
}

// Add a URL to the queue
function addToQueue(url){
	client.query('INSERT INTO queue (url) VALUES ($1) ON CONFLICT DO NOTHING;', [url], (err, res) => {
		if(err){
			console.log(err.stack);
			return false;
		}
		else{
			console.log(res);
			return true;
		}
	});
}

// Get the score of a url in master
function readMaster(){
	
}

// Add a url to the master list
function addToMaster(url, score, safe){
	client.query('INSERT INTO master (url, score, safe) VALUES ($1, $2, $3) ON CONFLICT (url) DO UPDATE SET score = $2, safe = $3, date_added = CURRENT_DATE;', [url, score, safe], (err, res) => {
		if(err){
			console.log(err.stack);
			return false;
		}
		else{
			console.log(res);
			return true;
		}
	});
}

