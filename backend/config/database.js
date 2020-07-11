require('dotenv').config();
const { createPool } = require("mysql");

const pool = createPool({
    port: 3306,
    host: "us-cdbr-east-05.cleardb.net",
    user: "b40ed23bca7922",
    password: "383c7a4b",
    database: "heroku_10df3eb7b4b5388",
    connectionLimit: 10
});

//using this pool we can call functions like query to query the MySQL database
module.exports = pool;
