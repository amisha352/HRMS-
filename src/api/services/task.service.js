const Errors = require("../../errors");
const models = require("../models");

class taskService {
  async createTask(payload, mrgId) {
    return new Promise(async (resolve, reject) => {
      await models.Tasks.create({
        discription: payload.discription,
        endDate: payload.endDate,
        empId: payload.empId,
        mrgId: mrgId,
      })
        .then((task) => {
          resolve(task);
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }

  async taskDone(id, empId) {
    return new Promise(async (resolve, reject) => {
      await models.Tasks.findOne({
        where: { id: id },
        attributes: ["empId", "mrgId"],
      })
        .then(async (task) => {
          if (empId == task.empId || empId == task.mrgId) {
            await models.Tasks.update({ status: "done" }, { where: { id: id } })
              .then(() => {
                resolve(true);
              })
              .catch((err) => {
                reject(Errors.InternalServerError(err));
              });
          } else {
            reject(Errors.UnauthorizedError("Access Denied!"));
          }
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }

  async approveTask(id, mrgId) {
    return new Promise(async (resolve, reject) => {
      await models.Tasks.findOne({
        where: { id },
        attributes: ["mrgId"],
      })
        .then(async (task) => {
          if (mrgId == task.mrgId) {
            await models.Tasks.update({ status: "approved" }, { where: { id } })
              .then(() => {
                resolve(true);
              })
              .catch((err) => {
                reject(Errors.InternalServerError(err));
              });
          } else {
            reject(Errors.UnauthorizedError("Access Denied!"));
          }
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }
  async rejectTask(id, mrgId) {
    return new Promise(async (resolve, reject) => {
      await models.Tasks.findOne({
        where: { id },
        attributes: ["mrgId"],
      })
        .then(async (task) => {
          if (mrgId == task.mrgId) {
            await models.Tasks.update({ status: "rejected" }, { where: { id } })
              .then(() => {
                resolve(true);
              })
              .catch((err) => {
                reject(Errors.InternalServerError(err));
              });
          } else {
            reject(Errors.UnauthorizedError("Access Denied!"));
          }
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }

  async empTask (id) {
    return new Promise(async (resolve,reject) =>{
       await models.Tasks.findAll({
         where:{empId:id}
       })
       .then((tasks) =>{
        resolve(tasks)
       })
       .catch((err)=>{
        reject(Errors.InternalServerError(err))
       })
    })
  }
}

module.exports = taskService;
