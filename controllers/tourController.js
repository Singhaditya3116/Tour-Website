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

exports.getAllTours = (req,res)=>{    //const getAllTours == export.getAllTours //just exporting
    res.status(200).json({
        status:"success",
        requiredTime : req.requiredTime,
        results:tours.length,
        data:{
            tours : tours
        }
    })
}
exports.getTour = (req,res)=>{  
    let id= req.params.id;
    /* Checking valid  ID
        if(id >=tours.length)
        {
            res.status(404).json({
                status:"fail",
                message:"Invalid Id"
            })
        }
    */

    res.status(200).send({
        status:"success",
        tour:tours[id]
    });
}

exports.createTour = (req,res)=>{  
    const newId = tours.length;
    const newTour = Object.assign({id:newId},req.body); //combining two object
    //console.log(newTour);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),(err)=>{
        res.status(201).json({
            status:"success",
            data:{
                tours : newTour
            }
        })
    })
}

exports.updateTour = (req,res)=>{   

    res.status(200).json({
        status:"success",
        data:{
             tours : "<Updated tour....> "
        }
    })
}

exports.deleteTour = (req,res)=>{

    res.status(204).json({
        status:"success",
        data:null
    })
}
