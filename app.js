const express = require("express");
const tourRouter = require("./routes/tourRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app =express();
///1)MiddleWares

app.use(express.json()) //Middleware
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`)); //serving static file like overview.html 

if(process.env.NODE_ENV === "development") //checking environment variable
{
    console.log("In development");
}
/*
app.use((req,res,next)=>{       //Middleware
    console.log("hello from the middleware");
    next();
})

app.use((req,res,next)=>{    //middle ware which is changing the request variable
    req.requiredTime = new Date().toISOString();
    next();
})
*/

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

app.all("*",(req,res,next)=>{

    // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    // err.statusCode=404;
    // err.status="fail";
    next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
})

app.use(globalErrorHandler);


//server.js
module.exports = app;