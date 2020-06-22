const express = require("express");
const app = express();
const userRouter = require("./backend/api/users/user.router");

//since user passes in json, we convert it into javascript object
app.use(express.json());

//if any requests come then we pass to /api/users route
app.use("/api/users", userRouter);

//listen to some endpoint at localhost:3000/api
/*
app.get("/api", (req, res) => {
    res.json({
        success: 1,
        message: "rest api is working"
    });
});
*/

app.listen(4000, ()=>{
    console.log("server up and running");
});


