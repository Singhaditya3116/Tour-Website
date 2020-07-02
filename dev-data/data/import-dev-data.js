const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("./../../models/tourModel");
dotenv.config({path:"./config.env"});


///console.log(process.env);

const DB = process.env.DATABASE.replace("<PASSWORD>",process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{
    useNewUrlParser:true,  //To deal with depricated tgings
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(con =>{
    //console.log(con.connections);
    console.log("DB connection established");
})

//Reading Json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,"utf-8"));

//Export data to DB

const importData = async ()=>{
    try{
        await Tour.create(tours);
        console.log("Data loaded successfully");
    }catch(err){
        console.log(err);
    }
    process.exit();
}

const deleteData = async ()=>{
    try{
        await Tour.deleteMany();
        console.log("Data deleted successfully");
    }catch(err){
        console.log(err);
    }
    process.exit();
}

if(process.argv[2] === "--import")
{
    importData();
} else if(process.argv[2] === "--delete"){
    deleteData();
}