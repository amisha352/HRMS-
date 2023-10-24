
const restrictedToAdmin = (req,res,next) =>{
    
    if(res.locals.userData.role !== 1){

        res.status(401).json({
            status:false,
            message:"Access Denied!"
        })

    }else{
        
        next()
    }
}

module.exports = restrictedToAdmin