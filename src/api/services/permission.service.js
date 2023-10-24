const Errors = require('../../errors')
const models = require('../models')

class permissionService {

    async createPermission(payload) {
   return new Promise(async (resolve,reject) =>{
    await models.Permissions.create({
        roleId:payload.roleId,
        routeId:payload.routeId,
        canCreate:payload.canCreate,
        canRead:payload.canRead,
        canDelete:payload.canDelete,
        canUpdate:payload.canUpdate
    })
    .then((permission) =>{
        resolve(permission)
    })
    .catch((err) =>{
        reject(Errors.InternalServerError(err))
    })

    })
  }
  
  async updatePermission (payload,id) {
    return new Promise(async (resolve,reject) =>{

        await models.Permissions.update(
            {
                roleId:payload.roleId,
                routeId:payload.routeId,
                canCreate:payload.canCreate,
                canRead:payload.canRead,
                canDelete:payload.canDelete,
                canUpdate:payload.canUpdate
            },
            {
                where:{id}
            }
        )
        .then((response) =>{
            resolve(true)
        })
        .catch((err) =>{
            reject(Errors.InternalServerError(err))
        })
    })
  }
  async deletePermission(id) {
     return new Promise(async (resolve,reject) =>{
        await models.Permissions.destroy({
            where:{id:id}
        })
        .then((response) =>{
            resolve(true)
        })
        .catch((err) =>{
            reject(Errors.InternalServerError(err))
        })
     })
  }

  async getAll (){
    return new Promise(async (resolve,reject) =>{
        await models.Permissions.findAll({})
        .then((response) =>{
            resolve(response)
        })
        .catch((err)=>{
            reject(Errors.InternalServerError(err))
        })
    })
  }

  async getById (id) {
    return new Promise(async (resolve,reject) =>{
        await models.Permissions.findOne({
            where:{id:id}
        }) 
        .then((permission) =>{
            resolve(permission)
        })
        .catch((err) =>{
            reject(Errors.InternalServerError(err))
        })

    })
  }
}

module.exports = permissionService