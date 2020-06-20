module.exports = {
    HOST: "us-cdbr-east-05.cleardb.net",
    USER: "b40ed23bca7922",
    PASSWORD: "383c7a4b",
    DB: "heroku_10df3eb7b4b5388",
    dialect: 'mysql',
    //max & min number of connections in pool along with idle/acquire times
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
