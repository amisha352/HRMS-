const Errors = require('../../errors')
const models = require('../models')

class routeService {
    async createRoute (payload){
        return new Promise(async (resolve,reject) =>{
            await models.Routes.create({
                name:payload.name
            })
            .then((route) =>{
                resolve(route)
            })
            .catch((err) =>{
                reject(Errors.InternalServerError(err))
            })
        })
    }

    async updateRoute (payload,id) {
        return new Promise(async (resolve,reject) =>{
            await models.Routes.update(
                {name:payload.name},
                {where:{id:id}}
            )
            .then((response) =>{
                resolve(true)
            })
            .catch((err) =>{
                reject(Errors.InternalServerError(err))
            })
        })
    }

    async deleteRoute (id) {
        return new Promise(async (resolve,reject) =>{
            await models.Routes.destroy({
                where:{id:id}
            })
            .then((response) =>{
                resolve(response)
            })
            .catch((err) =>{
                reject(Errors.InternalServerError(err))
            })
        })
    }

    async getAll () {
        return new Promise(async (resolve,reject) =>{
            await models.Routes.findAll({})
            .then((routes) =>{
                resolve(routes)
            })
            .catch((err) =>{
                reject(Errors.InternalServerError(err))
            })
        })
    }

    async getById(id) {
        return new Promise(async (resolve,reject) =>{
            await models.Routes.findOne({
                where:{id}
            })
            .then((route) =>{
                resolve(route)
            })
            .catch((err)=>{
                reject(Errors.InternalServerError(err))
            })
        })
    }
}
module.exports = routeService