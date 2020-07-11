const express = require("express");
const app = express();
const userRouter = require("./backend/api/users/user.router");
const dashboardRouter = require("./backend/api/dashboard/dashboard.router");
const displayRouter = require("./backend/api/dashDisplay/dashDisplay.router");
const cors = require("cors");

app.use(cors());

//since user passes in json, we convert it into javascript object
app.use(express.json());

//if any requests come for user data then we pass to /api/users route 
app.use("/api/users", userRouter);
//if any requests come to update user dashboard data then we pass to /api/dashb route
app.use("/api/dashb", dashboardRouter);
//if any requests come to update user display data then we pass to /api/disp route
app.use("/api/disp", displayRouter);

app.listen(process.env.PORT || 4000, ()=>{
    console.log("server up and running");
});


