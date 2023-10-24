const Errors = require("../../errors");
const models = require("../models");

class dsgService {
  async createDsg(payload) {
    return new Promise(async (resolve, reject) => {
      await models.Designation.create({
        name: payload.name,
        salary: payload.salary,
        dptId: payload.dptId,
      })
        .then((dsg) => {
          resolve(dsg);
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }

  async updateDsg(payload, id) {
    return new Promise(async (resolve, reject) => {
      await models.Designation.update(
        {
          name: payload.name,
          salary: payload.salary,
          dptId: payload.dptId,
        },
        {
          where: { id: id },
        }
      )
        .then((response) => {
          resolve(true);
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }
  async getAll() {
    return new Promise(async (resolve, reject) => {
      await models.Designation.findAll({})
        .then((dsgs) => {
          resolve(dsgs);
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }

  async getById(id) {
    return new Promise(async (resolve, reject) => {
      await models.Designation.findOne({
        where: { id: id },
      })
        .then((dsg) => {
          resolve(dsg);
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }

  async deleteDsg(id) {
    return new Promise(async (resolve, reject) => {
      await models.Designation.destroy({
        where: { id: id },
      })
        .then((dsg) => {
          resolve(true);
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }
}

module.exports = dsgService;
