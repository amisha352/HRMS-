const models = require('../api/models')
const Errors = require('../errors')
function setRoute (routeNm) {
    return async (req,res,next) =>{
        await models.Routes.findOne({
            where:{
                name:routeNm
            },
            attributes:['id']
        })
        .then((route) =>{
            res.locals.routeId = route.id
            next()
        })
        .catch((err) =>{
            next(Errors.InternalServerError(err))
        })
    }
}

module.exports = setRoute