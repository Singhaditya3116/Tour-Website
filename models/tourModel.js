const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({ //Schema
    name:{
        type:String,
        required:[true,"A tour must have a name"],
        trim:true, //whitespace in the begining and the end get removed
        unique:true
    },
    duration:{
        type:Number,
        required:[true,"A tour must have a duration"]
    },
    maxGroupSize:{
        type:Number,
        required:[true,"A tour must have a group size"]
    },
    difficulty:{
        type:String,
        required:[true,"A tour must have a difficulty"]
    },
    ratingsAverage:{
        type:Number,
        default:4.5
    },
    ratingsQuantity:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:[true,"A tour must have a price"]
    },
    discount:Number,
    summary:{
        type:String,
        trim:true, //whitespace in the begining and the end get removed
        required:[true,"A tour must have a summary"]
    },
    description:{
        type:String,
        required:[true,"A tour must have a description"]
    },
    imageCover:{
        type:String,
        required:[true,"A tour must have a cover image"]
    },
    images: [String],
    createdAt:{
        type:Date,
        default:Date.now()
    },
    startDates:[Date]

})

const Tour = mongoose.model("Tour",tourSchema); //models

module.exports = Tour;