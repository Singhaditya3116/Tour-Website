const express = require("express");

const app = express();
const port=3000;

app.get("/",(req,res)=>{
    //res.status(200).send("Hello this is from server side");
    res.status(200).json({name:"aditya",age:"20"});
})

app.post("/",(req,res)=>{
    res.send("You can now post on this URL");
})

app.listen(port,()=>{
    console.log(`Server is listening at port ${port}`);
}) 

