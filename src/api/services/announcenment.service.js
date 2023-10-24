const Errors = require("../../errors");
const models = require("../models");
const { Op } = require("sequelize");

class ancService {
  async createAnc(payload) {
    return new Promise(async (resolve, reject) => {
      await models.Announcement.create({
        content: payload.content,
      })
        .then((anc) => {
          resolve(anc);
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }

  async getLatest() {
    return new Promise(async (resolve, reject) => {
      await models.Announcement.findAll()
        .then((ancs) => {
          const anc = ancs.filter((a) => {
            return a.id == ancs.length;
          });
          resolve(anc);
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }

  async getThisMonth() {
    return new Promise(async (resolve, reject) => {
      const currYear = new Date().getFullYear();
      const currMon = new Date().getMonth() + 1;
      await models.Announcement.findAll({
        where: {
          createdAt: {
            [Op.and]: {
              [Op.gte]: new Date(`${currYear}-${currMon}-01`),
              [Op.lt]: new Date(`${currYear}-${currMon + 1}-01`),
            },
          },
        },
      })
        .then((ancs) => {
          resolve(ancs);
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }
}
module.exports = ancService;
