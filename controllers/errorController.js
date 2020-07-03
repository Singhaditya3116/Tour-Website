module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500; //internaal server error
    err.status = err.status || "err";

    res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    })
}