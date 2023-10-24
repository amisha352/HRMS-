const Errors = require('../errors')

const endPointNotFound = (req,res) =>{

    const err = new Errors(404,`requested url - ${req.originalUrl} not found`)

    res.status(err.statusCode).json({
        status:false,
        message:err.message,
        stack:null
    })

}

module.exports = endPointNotFound