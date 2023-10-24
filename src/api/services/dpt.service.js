const Errors = require("../../errors");
const models = require("../models");

class dptService {
  async createDpt(payload) {
    return new Promise(async (resolve, reject) => {
      await models.Department.create({
        name: payload.name,
        managerId: payload.mgrId,
      })
        .then((dpt) => {
          resolve(dpt);
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }

  async getAll() {
    return new Promise(async (resolve, reject) => {
      await models.Department.findAll({
        include: [
          {
            model: models.User,
          },
          {
            model: models.User,
            as: "manager",
            where: {
              roleId: 3,
            },
          },
        ],
      })
        .then((dpts) => {
          resolve(dpts);
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }
  async getById(id) {
    return new Promise(async (resolve, reject) => {
      await models.Department.findOne({
        where: { id: id },
        include: [
          {
            model: models.User,
          },
          {
            model: models.User,
            as: "manager",
            where: {
              roleId: 3,
            },
          },
        ],
      })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }

  async deleteDepartment(id) {
    return new Promise(async (resolve,reject) =>{
      await models.Department.destroy({
        where:{id:id}
      })
      .then(() =>{
        resolve(true)
      })
      .catch((err) =>{
        reject(Errors.InternalServerError(err))
      })
    })
  }
  async updateDepartment(payload,id){
    return new  Promise(async (resolve,reject) =>{
         await models.Department.update(
          {
            name: payload.name,
            managerId: payload.mgrId,
          },
          {where:{id:id}}
         )
         .then(() =>{
          resolve(true)
         })
         .catch((err) =>{
          reject(Errors.InternalServerError(err))
         })
    })
  }
}

module.exports = dptService;
