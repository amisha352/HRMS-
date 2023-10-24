
const restrictedToManager = (req,res,next) =>{
    
    if(res.locals.userData.role == 1 || res.locals.userData.role == 3){
        
        next()
        
    }else if(res.locals.userData.role !== 1 || res.locals.userData.role !== 3){

        res.status(401).json({
            status:false,
            message:"Access Denied!"
        })

    }
}

module.exports = restrictedToManager