require('dotenv').config();
const { createPool } = require("mysql");

const pool = createPool({
    port: process.env.PORT,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: process.env.CONNECTION_LIMIT
});

//using this pool we can call functions like query to query the MySQL database
module.exports = pool;
