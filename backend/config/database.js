require('dotenv').config();
const { createPool } = require("mysql");

const pool = createPool({
    /*
    port: process.env.PORT,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: process.env.CONNECTION_LIMIT
    */    
    port: 3306,
    host: "us-cdbr-east-05.cleardb.net",
    user: "b40ed23bca7922",
    password: "383c7a4b",
    database: "heroku_10df3eb7b4b5388",
    connectionLimit: 10
});

//using this pool we can call functions like query to query the MySQL database
module.exports = pool;
