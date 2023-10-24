const Errors = require("../errors")

const errorHandler = (err,req,res,next) =>{

    if(err instanceof Errors){
        res.status(err.statusCode).json({
            status:false,
            message:err.message,
            data: null,
        })
    }else{
        console.log(err)
        res.status(500).json({
            status:false,
            message:'Internal server Error !',
            data:null
        })
    }
}

module.exports = errorHandler