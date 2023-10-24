const Errors = require("../../errors");
const models = require("../models");

class feedBackService {
  async createFb(payload, mrgId) {
    return new Promise(async (resolve, reject) => {
      await models.Feedback.create({
        empId: payload.empId,
        description: payload.description,
        mrgId: mrgId,
      })
        .then((fb) => {
          resolve(fb);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  async cretaedByMrg(mrgId) {
    return new Promise(async (resolve, reject) => {
      await models.Feedback.findAll({
        where: { mrgId: mrgId },
      })
        .then((fbs) => {
          resolve(fbs);
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }
}

module.exports = feedBackService;
