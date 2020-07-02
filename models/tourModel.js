const mongoose = require("mongoose");
const validator = require("validator");
const tourSchema = new mongoose.Schema({ //Schema
    name:{
        type:String,
        required:[true,"A tour must have a name"],
        trim:true, //whitespace in the begining and the end get removed
        unique:true,
        maxlength: [40,"A tour must have less than or equal to 40 characters"],
        minlength: [10,"A tour must have more than or equal to 10 characters"],
        //validate: [validator.isAlpha,"A name must only contains characters"]
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
        required:[true,"A tour must have a difficulty"],
        enum: {
            values: ["easy","medium","difficult"],
            message: "Difficulty cannot this value"
        }
    },
    ratingsAverage:{
        type:Number,
        default:4.5,
        min: [1,"rating must be above 1.0"],
        max: [5,"rating must be below 5.0"],

    },
    ratingsQuantity:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:[true,"A tour must have a price"]
    },
    discount:{
        type:Number,
        validate: {
            message:"Discount price should be less than regular price",
            validator:function(val){
                return val < this.price //discount < price
                }
        }
    },
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

},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
}
)

tourSchema.virtual("durationWeeks").get(function(){
    return this.duration/7;
})

//DOCUMENT MIDDLEWARE
tourSchema.pre("save",function(next){  //runs before .save and .create
    console.log(this);
    next();
})

//QUERY MIDDLEWARE
tourSchema.pre("find",function(next){
    console.log(this)
    next();
})

const Tour = mongoose.model("Tour",tourSchema); //models



module.exports = Tour;