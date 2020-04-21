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
const got = require('got');

// This portion handles the redirected requests from my webserver
exports.checkLink = function(url, callback){
	// Clean the URL of all unwanted noise
	sanitizeURL(url, (cleanURL) => {
		// Check if the url is in the database
		readMaster(cleanURL, resDB => {
			// Item not in database, make API call
			if(resDB.success == false){
				makeAPICall(cleanURL, resAPI => {
					callback(resAPI);
				});
			}
			// Item is in database, return results
			else{
				callback(resDB);
			}
		});
	});		
}

exports.updateLink = function(url, callback){
	sanitizeURL(url, (cleanURL) => {
		callback(updateMaster(cleanURL));
	});
}

/*===============================================================================
API CLASS
===============================================================================*/

// Make an API call with a url, if quota is met, return false and add to queue
function makeAPICall(url, callback){
	// Virus Total
	// Listen for error code 429
	// Response code 404
	// code 404 if the URL isn't real

	// ALL HTTPS info needs to be scrubbed by this point in the code
	got(Buffer.from(url).toString('base64').replace(new RegExp('=', 'g'), ''), {
		headers: {
			'x-apikey': process.env.SDD_API_KEY, 
			'content-type': 'application/json'
		},
		prefixUrl: 'https://www.virustotal.com/api/v3/urls',
		throwHttpErrors: false}

	// Handle all HTTP response types
	).then(res => {
		// URL not valid or doesn't exist
		if(res.statusCode == 404){
			callback({ success: false });
			console.log('URL not valid or doesn\'t exist');
		}
		// Ran out of quota, add to queue
		else if(res.statusCode == 429){
			callback({ success: false });
			console.log('Ran out of quota.');
			addToQueue(url);
		}
		// Successful response, return then add to master
		else if(res.statusCode == 200){
			decodeResults(JSON.parse(res.body).data.attributes.last_analysis_stats, url, (verdict) => {
				callback(verdict);
				addToMaster(url, verdict.score, verdict.safe);
			});
			// console.log(JSON.parse(res.body).data.attributes.last_analysis_stats);
		}
		// Handle any other cases with a default failure
		else{
			callback({ success: false });
		}
		console.log('Made API call for: ' + url);
		
	// Catch unknown errors
	}).catch(error => {
		
		console.log(error);
		callback({ success: false });
	});
}

// Make API calls for the queue
function makeQueueAPICall(url, callback){
	console.log("todo");
}


/*===============================================================================
DATABASE CLASS
===============================================================================*/

// Connect to the database

// These are variables class
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
		console.error('Error: Cannot connect to secondchance database: ', err.stack);
	}
	else{
    	console.log('Connected to secondchance database.');
  	}
});

// Read the top most item from the queue
function processQueue(){
	client.query('SELECT url FROM queue ORDER BY date_added ASC LIMIT 1;', (err, res) => {
		if(err){
			console.log(err.stack);
		}
		else{
			// Make a queue API call
			console.log(res.rows[0]);
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
			return true;
		}
	});
}

// Get the score of a url in master
function readMaster(url, callback){
	client.query('SELECT url, score, safe FROM master WHERE url = $1 LIMIT 1;', [url], (err, res) => {
		if(err){
			console.log(err.stack);
			callback({ success: false });
		}
		else if(res.rowCount == 0){
			console.log(url + ' not in database.');
			callback({ success: false });
		}
		else{
			callback( {success:true, url:res.rows[0].url, score:res.rows[0].score, safe:res.rows[0].safe});
		}
	});
}

// Add a url to the master list
function addToMaster(url, score, safe){
	client.query('INSERT INTO master (url, score, safe) VALUES ($1, $2, $3) ON CONFLICT (url) DO UPDATE SET score = $2, safe = $3, date_added = CURRENT_DATE;', [url, score, safe], (err, res) => {
		if(err){
			console.log(err.stack);
			return false;
		}
		else{
			return true;
		}
	});
}

function updateMaster(url){
	console.log(url);
	client.query('UPDATE master SET safe = True, score = 99 WHERE url = $1;', [url], (err, res) => {
		return true;
	});
}

/*===============================================================================
BACKEND LINK CLASS
===============================================================================*/

// Ensure that a URL provided is real and in the right form
function sanitizeURL(url, callback){
	callback(
		url.replace(
			new RegExp('^http://', ''), ''
		).replace(
			new RegExp('^https://', ''), ''
		).split('/')[0]
	);
}

// Convert the API response into actionable data
// safe is above 95
function decodeResults(res, url, callback){
	calculateScore(res.harmless, res.malicious, res.suspicious, (score) => {
		if(score > 95){
			callback({
				success: true,
				url: url,
				score: score,
				safe: true
			});
		}
		else{
			callback({
				success: true,
				url: url,
				score: score,
				safe: false
			});
		}
	});
}

// Calculate the score of a URL
// range here is (100, -infinity)
function calculateScore(harmless, malicious, suspicious, callback){
	callback(Math.round( 100 * (harmless - (2 * malicious) - suspicious) / (harmless + 1) )); 
}