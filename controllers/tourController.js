const Tour = require("./../models/tourModel");  //model with the help of which we can perform operation on the data
const app = require("../app");
const APIFeatures = require("./../utils/apiFeatures");

/*              Since i am using now database so no use of FILE SYSTEM.
const fs = require("fs");
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));  //convert to JS object



 EARLIER WAY OF CREATING TOUR  
        const testTour = new Tour({                   //Testing
            name:"The Park Camper",5efb3a5c41e65669d5421bd2
            price:997,
            //rating: 4.7
        })

        testTour.save()
                .then(doc => console.log(doc))
                .catch(err => console.log("error ",err))
*/

exports.getAllTours = async (req,res)=>{    //const getAllTours == export.getAllTours //just exporting

    try{
        //EXECUTE QUERY

        const features = new APIFeatures(Tour.find(),req.query).filter().sort().limitFields().paginate();
        const tours = await features.query;
        
        //SEND RESPONSE
        res.status(200).json({
            status:"success",
            results:tours.length,
            data:{
                tours : tours
            }
        })
    }catch(err){
        res.status(404).json({
            status:"fail",
            message:"Not found"
        })
    }
}

exports.getTour = async (req,res)=>{  
    try{
        let id= req.params.id;
        const tours = await Tour.findById(id);
        console.log(tours);
        res.status(200).send({
            status:"success",
            tour:tours
        });
    }catch(err)
    {
        res.status(404).json({
            status:"fail",
            message:"Not found"
        })
    }
}

exports.createTour = async (req,res)=>{  
    try{
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status:"success",
            data:{
                tours : newTour
            }
        })
    }
    catch(err){
        res.status(400).json({
            status:"fail",
            message: "Invalid data sent"
        })
    }
}

exports.updateTour = async (req,res)=>{   

    try{
        const newTour = await Tour.findByIdAndUpdate(req.params.id, {$set: req.body},{
            new:true,  //Return modified object
            runValidators:true  // run validator for the updating docx
            .post(tourController.createTour)
        })
        console.log(newTour,req.params.id,req.body);

        res.status(200).json({
            status:"success",
            data:{
                tours :newTour
            }
        })
    }catch(err){
        res.status(404).json({
            status:"fail",
            message:"Not found"
        })
    }
}

exports.deleteTour = async (req,res)=>{

    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status:"success",
        data:null
    })
}

exports.aliasTopTours = (req,res,next)=>{
    req.query.limit="5";
    req.query.sort="-ratingsAverage,price";
    req.query.fields="name,price,ratingsAverage,summary,difficulty";
    next();
}

exports.getTourStats =async (req,res)=>{

    try{

        const stats = await Tour.aggregate([
            {
                $match: { ratingsAverage :{ $gte : 4.5} }
            },
            {
                $group: {
                    _id: "$difficulty",
                    numTours : {$sum :1},
                    numRatings: {$sum : "$ratingsQuantity"},
                    avgRating: { $avg: "$ratingsAverage" },
                    avgPrice: { $avg: "$price"},
                    minPrice: { $min: "$price"},
                    maxPrice: { $max: "$price" }
                }
            },
            {
                $sort:{ avgPrice:1}   //1 For ascending
            }
        ])

        res.status(200).json({
            status:"success",
            data:{
                stats :stats
            }
        })

    }catch(err){
        res.status(404).json({
            status:"fail",
            message:"Not found"
        })
    }
}

exports.getMonthlyPlan = async (req,res)=>{

    try{
        const year = req.params.year *1;

        const plan = await Tour.aggregate([
            {
                $unwind: "$startDates"
            },
            {
                $match: {
                    startDates:{
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group:{
                    _id:{$month : "$startDates"},
                    numTourStart: {$sum: 1},
                    tours: {$push: "$name"}
                }
            },
            {
                $addFields:{
                    month: "$_id" 
                }
            },
            {
                $project:{
                    _id: 0
                }
            },
            {
                $sort: {numTourStart: -1}
            },
            {
                $limit:12
            }

        ]);

        res.status(200).json({
            status:"success",
            data:{
                plan :plan
            }
        })


    }catch(err){
        res.status(404).json({
            status:"fail",
            message:"Not found"
        })
    }
}
