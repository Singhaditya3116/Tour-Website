const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config({path:"./config.env"});
const app = require("./app");

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




const port=4000;
app.listen(port,()=>{
    console.log(`Server started at port ${port}`);
    //kill portt sudo kill -9 `sudo lsof -t -i:4000`
})