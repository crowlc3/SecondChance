// Second Chance Webserver File
// SDD 2020

require('dotenv').config();
const express = require('express');
const app = express();

const HTTP_PORT = process.env.HTTP_PORT || "3000";

app.get("/", (req, res) => {
	res.status(200).send("Success. Application is running.");
});

app.listen(HTTP_PORT, () => {
	console.log("Express application listening on port " + HTTP_PORT);
});