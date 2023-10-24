const Errors = require("../../errors");
const models = require("../models");
const { signJwt } = require('../../helpers/jwt')
class managerService {
  async createManager(id) {
    return new Promise(async (resolve, reject) => {
      await models.User.update({ roleId: 3 }, { where: { id: id } })
        .then(async (result) => {
           await models.User.findOne({
            where: { id: id },
            attributes: ["dptId","id",'email','roleId'],
          })
            .then(async (mrg) => {
              const token = signJwt({
                id:mrg.id,
                email:mrg.email,
                roleId:mrg.roleId
              })
              this.updateToken(token,mrg.id)
              await models.User.update(
                { mrgId: id },
                { where: { dptId: mrg.dptId } }
              );
              await models.Department.update(
                { managerId: id },
                { where: { id: mrg.dptId } }
              );
              await models.User.update({ mrgId: null }, { where: { id } });
              resolve({
                mrg,
                token
              });
            })
            .catch((err) => {
              reject(Errors.InternalServerError(err));
            });
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }

  async getAll() {
    return new Promise(async (resolve, reject) => {
      await models.User.findAll({
        where: { roleId: 3 },
        attributes: ["id", "fullName", "email", "roleId", "dptId"],
        include: [
          {
            model: models.Department,
            attributes: ["name"],
          },
        ],
      })
        .then((mrgs) => {
          resolve(mrgs);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  
  async updateToken(token, id) {
    return new Promise(async (resolve, reject) => {
      await models.User.update({ jwtToken: token }, { where: { id: id } })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }
}
module.exports = managerService;
