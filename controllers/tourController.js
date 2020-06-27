const fs = require("fs");

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));  //convert to JS object

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
    if(id >=tours.length)
    {
        res.status(404).json({
            status:"fail",
            message:"Invalid Id"
        })
    }

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

    if(req.params.id*1> tours.length)
    {
        res.status(404).json({
            status:"fail",
            message:"Invalid Id"
        })
    }
    res.status(200).json({
        status:"success",
        data:{
             tours : "<Updated tour....> "
        }
    })
}

exports.deleteTour = (req,res)=>{
    if(req.params.id*1> tours.length)
    {
        res.status(404).json({
            status:"fail",
            message:"Invalid Id"
        })
    }
    res.status(204).json({
        status:"success",
        data:null
    })
}
