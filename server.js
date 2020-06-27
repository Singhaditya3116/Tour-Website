const dotenv = require("dotenv")

dotenv.config({path:"./config.env"});

const app = require("./app");

///console.log(process.env);


const port=4000;
app.listen(port,()=>{
    console.log(`Server started at port ${port}`);
    //kill portt sudo kill -9 `sudo lsof -t -i:4000`
})