
const { PermissionService } = require('../services')
const permissionService = new PermissionService()


const createPermission = async (req,res,next) =>{
    await permissionService.createPermission(req.body)
    .then((response) =>{
        res.status(201).json({
            status:true,
            data:response
        })
    })
    .catch((err) =>{
        next(err)
    })

}

const updatePermission = async (req,res,next) =>{

    await permissionService.updatePermission(req.body,req.params.id)
    .then((response) =>{
        res.status(200).json({
            status:true,
            message:"permission has been updated"
        })
    })
    .catch((err) =>{
        next(err)
    })
}
const deletePermission = async (req,res,next) =>{
      
    await permissionService.deletePermission(req.params.id)
    .then((response) =>{
        res.status(200).json({
            status:true,
            meassge:'permission hs been deleted'
        })
    }) 
    .catch((err) =>{
        next(err)
    })
}
const getAll = async (req,res,next) =>{

    await permissionService.getAll()
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

const getById = async (req,res,next) => {
    await permissionService.getById(req.params.id)
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

    createPermission,
    updatePermission,
    deletePermission,
    getAll,
    getById
}