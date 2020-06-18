var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

const app = express();

//parse requests of content-type: application/json
app.use(bodyParser.json());

//parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Casual Decision Maker" });
});

//set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

//connect to database
var connection = mysql.createConnection({
  host: 'us-cdbr-east-05.cleardb.net',
  user: 'b40ed23bca7922',
  password: '383c7a4b',
  database: 'heroku_10df3eb7b4b5388'
})

//open connection to MySQL
connection.connect(error => {
  if (error) throw error;
  console.log("Connection Successful");
});

module.exports = connection;

