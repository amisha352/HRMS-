const Errors = require("../../errors/index");
const models = require("../models");

class ycService {
  async createMonth(payload) {
    return new Promise(async (resolve, reject) => {
      await models.YearlyCalendar.create({
        month: payload.month,
        totalDays: payload.totalDays,
        holydays: payload.holydays,
        holydaysNm: payload.holydaysNm,
        workingDays: payload.workingDays,
      })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }

  async updateMonth(id, payload) {
    return new Promise(async (resolve, reject) => {
      await models.YearlyCalendar.update(
        {
          month: payload.month,
          totalDays: payload.totalDays,
          holydays: payload.holydays,
          holydaysNm: payload.holydaysNm,
          workingDays: payload.workingDay,
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
    return new Promise(async(resolve,reject) =>{
      await models.YearlyCalendar.findAll()
      .then((response) =>{
        resolve(response)
      })
      .catch((err) =>{
        reject(Errors.InternalServerError(err))
      })
    })
  }

}

module.exports = ycService;
