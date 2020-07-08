require('dotenv').config();
const { createPool } = require("mysql");

const pool = createPool({
    port: process.env.REACT_APP_PORT,
    host: process.env.REACT_APP_HOST,
    user: process.env.REACT_APP_USER,
    password: process.env.REACT_APP_PASSWORD,
    database: process.env.REACT_APP_DATABASE,
    connectionLimit: process.env.REACT_APP_CONNECTION_LIMIT
});

//using this pool we can call functions like query to query the MySQL database
module.exports = pool;
