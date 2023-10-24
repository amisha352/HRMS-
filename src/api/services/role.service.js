const Errors = require("../../errors");
const models = require("../models");

class roleService {
  async createRole(payload) {
    return new Promise(async (resolve, reject) => {
      await models.Role.create({
        name: payload.name,
      })
        .then((role) => {
          resolve(role);
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }

  async getAll() {
    return new Promise(async (resolve, reject) => {
      await models.Role.findAll()
        .then((roles) => {
          resolve(roles);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getById(id) {
    return new Promise(async (resolve, reject) => {
      await models.Role.findOne({
        where: { id: id },
      })
        .then((role) => {
          resolve(role);
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }

  async updateRole(payload) {
    return new Promise(async (resolve, reject) => {
      await models.Role.update(
        {
          name: payload.name,
        },
        {
          where: { id: payload.id },
        }
      )
        .then((flag) => {
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async deleteRole(id) {
    return new Promise(async (resolve, reject) => {
      await models.Role.destroy({
        where: { id: id },
      })
        .then((flag) => {
          resolve(true);
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }
}

module.exports = roleService;
