const models = require('../api/models')
const { Op } = require('sequelize')
const Errors = require('../errors')
function checkPermission (permissionNm) {

     return async (req,res,next) =>{

        await models.Permissions.findOne({
             where:{
                [Op.and]:{
                    roleId:res.locals.userData.role,
                    routeId:res.locals.routeId
                },
                
             },
             
        })
        .then((permission) =>{
            
            console.log(permission[`${permissionNm}`])
            if( permission[`${permissionNm}`] == true){
                next()
            }else{
                next(Errors.UnauthorizedError('Access Denied !!!'))
            }

        })
        .catch((err) =>{
            next(Errors.InternalServerError(err))
        })

     }
} 

module.exports = checkPermission