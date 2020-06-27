const express = require("express");
const tourRouter = require("./routes/tourRoutes.js");
const userRouter = require("./routes/userRoutes.js");

const app =express();

///1)MiddleWare

app.use(express.json()) //Middleware

app.use((req,res,next)=>{       //Middleware
    console.log("hello from the middleware");
    next();
})

app.use((req,res,next)=>{    //middle ware which is changing the request variable
    req.requiredTime = new Date().toISOString();
    next();
})

//2)Route Handler

/*
app.get("/api/v1/tours",getAllTours) //get all the tours
app.get("/api/v1/tours/:id",getTour) //get particular tour
app.post("/api/v1/tours",createTour)   // add new tour.
app.patch("/api/v1/tours/:id",updateTour)     //update small part of tour
app.delete("/api/v1/tours/:id",deleteTour)  //delete a tour
*/

//3)Routes

app.use("/api/v1/tours",tourRouter); //Mounting the router
app.use("/api/v1/users",userRouter);


//server.js
module.exports = app;