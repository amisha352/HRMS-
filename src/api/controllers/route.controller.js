const { RouteService } = require('../services')
const routeService = new RouteService()

const createRoute = async (req,res,next) =>{

    await routeService.createRoute(req.body)
    .then((response) =>{
        res.status(200).json({
            status:true,
            data:response
        })
    })
    .catch((err) =>{
        next(err)
    })

}
const updateRoute = async (req,res,next) =>{
    await routeService.updateRoute(req.body,req.params.id)
    .then((response) =>{
        res.status(200).json({
            status:true,
            message:'route has been updated'
        })
    })
    .catch((err) =>{
        next(err)
    })
}

const deleteRoute = async (req,res,next) =>{
    await routeService.deleteRoute(req.params.id)
    .then((response) =>{
        res.status(200).json({
            status:true,
            data:"route has been deleted"
        })
    })
    .catch((err) =>{
        next(err)
    })
}

const getAll = async (req,res,next) =>{
    await routeService.getAll()
    .then((response) =>{
        res.status(200).json({
            status:true,
            data:response
        })
    })
    .catch((err) =>{
        next(err)
    })
}

const getById = async (req,res,next) =>{
    await routeService.getById(req.params.id) 
    .then((response) =>{
        res.status(200).json({
            status:true,
            data:response
        })
    })
    .catch((err) =>{
        next(err)
    })
}

module.exports = {
    createRoute,
    updateRoute,
    deleteRoute,
    getAll,
    getById

}