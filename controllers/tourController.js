const Tour = require("./../models/tourModel");  //model with the help of which we can perform operation on the data
const app = require("../app");

/*              Since i am using now database so no use of FILE SYSTEM.
const fs = require("fs");
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));  //convert to JS object


exports.checkId = (req,res,next,val)=>{
    if(val >=tours.length)
    {
        return res.status(404).json({   //while checking id return beacuse we dont want further code to get executed with the next() kwyword
            status:"fail",
            message:"Invalid Id"
        })
    }
    next();
}

exports.checkBody = (req,res,next)=>{
    if(req.body.name == null || req.body.price ==null)
    {
        return res.status(400).json({ //Bad request
            status:"fail",
            message:"Missing name or price"
        })
    }
    next();
}
*/

/* EARLIER WAY OF CREATING TOUR  
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
        console.log("req.query ",req.query);
        //BUILD QUERY
        //1A)FILTERING
        let queryObj = { ...req.query }; //creating a copy of the object 
        const excludedFields = ['page','sort','limits'];
        excludedFields.forEach(el => delete queryObj[el]);

        //1B)ADVANCE FILTERING
        //{ difficulty: 'easy', duration: { $gte: '5' } }  --mongo 
        // { difficulty: 'easy', duration: { gte: '5' } }    --req.query
        let queryString = JSON.stringify(queryObj);
        queryString =queryString.replace(/\b(gte|gt|lte|lt)\b/g,match => `$${match}`);
        queryString = JSON.parse(queryString);
        //console.log("queryobject ",queryString);
        let query = Tour.find();


        //2)SORTING
        if(req.query.sort)
        {
            const sortBy =req.query.sort.split(",").join(" ");
            query=query.sort(sortBy);
        }else{
            query=query.sort('-createdAt');
        }

        //3)FIELD LIMITING
        if(req.query.fields)
        {
            const fields = req.query.fields.split(",").join(" ");
            console.log(fields);
            query=query.select(fields);
        }else{
            query=query.select('-__v -summary'); //not send __v
        }

        //4]PAGINATION
        const page =req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page-1)*limit;

        query=query.skip(skip).limit(limit);

        if(req.query.page)
        {
            const numTours = await Tour.countDocuments();
            if(skip >= numTours) 
            {
                throw new Error("The Document doesn't exist")
            }
        }


        //EXECUTE QUERY
        const tours = await query;
        
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
