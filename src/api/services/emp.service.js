const Errors = require("../../errors");
const models = require("../models");
const { Op } = require("sequelize");

class empService {
  async getAll() {
    return new Promise(async (resolve, reject) => {
      await models.User.findAll({
        where: {
          [Op.or]: [{ roleId: 2 }, { roleId: 3 }],
        },
        include: [
          {
            model: models.Department,
          },
        ],
      })
        .then((emps) => {
          resolve(emps);
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }
  async getById(id) {
    return new Promise(async (resolve, reject) => {
      await models.User.findOne({
        where: { id: id },
        include: [
          {
            model: models.Department,
          },
        ],
      })
        .then((emp) => {
          resolve(emp);
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }
  async markIn(empId) {
    return new Promise(async (resolve, reject) => {
      await models.User.findOne({
        where: { id: empId },
        attributes: ["workingDays"],
      })
        .then(async (user) => {
          await models.Worklog.create({
            in: new Date(),
            empId: empId,
          });
          let upDay = user.workingDays + 1;
          await models.User.update(
            { workingDays: upDay },
            { where: { id: empId } }
          )
            .then((response) => {
              resolve(true);
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }

  async markOut(empId) {
    const currYear = new Date().getFullYear();
    const currMon = new Date().getMonth() + 1;
    const currDate = new Date().getDate() + 1;
    return new Promise(async (resolve, reject) => {
      await models.Worklog.update(
        { out: new Date() },
        {
          where: {
            empId: empId,
            in: {
              [Op.and]: {
                [Op.lte]: new Date(`${currYear}-${currMon}-${currDate}`),
                [Op.gt]: new Date(`${currYear}-${currMon}-${currDate - 1}`),
              },
            },
          },
        }
      )
        .then(async (log) => {
          console.log(new Date(`${currYear}-${currMon}-${currDate}`));
          console.log(new Date(`${currYear}-${currMon}-${currDate - 1}`));
          await models.Worklog.findOne({
            where: {
              empId: empId,
              in: {
                [Op.and]: {
                  [Op.lte]: new Date(`${currYear}-${currMon}-${currDate}`),
                  [Op.gt]: new Date(`${currYear}-${currMon}-${currDate - 1}`),
                },
              },
            },
          })
            .then(async (log) => {
              const hrs = ((log.out - log.in) / (1000 * 60 * 60)).toFixed(2);
              await models.Worklog.update(
                { workingHours: Number(hrs) },
                {
                  where: {
                    empId: empId,
                    in: {
                      [Op.and]: {
                        [Op.lte]: new Date(`${currYear}-${currMon}-${currDate}`),
                        [Op.gt]: new Date(`${currYear}-${currMon}-${currDate - 1}`),
                      },
                    },
                  },
                }
              );
              await models.User.findOne({
                where: { id: empId },
                attributes: ["workingHours", "workingDays"],
              })
                .then(async (user) => {
                  let totalhrs = (user.workingHours + Number(hrs)).toFixed(2);

                  await models.User.update(
                    { workingHours: totalhrs },
                    { where: { id: empId } }
                  );
                  resolve({
                    workingDays: user.workingDays,
                    workingHours: user.workingHours,
                    totalhrs: user.totalhrs,
                    todayhrs: Number(hrs),
                  });
                })
                .catch((err) => {
                  reject(Errors.InternalServerError(err));
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

  async monthlyAvgWH(empId) {
    return new Promise(async (resolve,reject) =>{
      const currYear = new Date().getFullYear()
      const currMon = new Date().getMonth() + 1
       await models.Worklog.findAll(
        {
          where:{
            empId:empId,
            in:{
              [Op.and]: {
                [Op.gte]: new Date(`${currYear}-${currMon}-01`),
                [Op.lt]: new Date(`${currYear}-${currMon+1}-01`),
              },
            }
          }
        }
       )
       .then(async (leaves) =>{
        const whArr = leaves.map(l => l.workingHours)
        const totalhrs = whArr.reduce((total,wh) => total+wh)
        const avgHrs = totalhrs / (leaves.length)
        
        resolve({
          totalDays : leaves.length,
          totalhrs: totalhrs,
          avrageHours: avgHrs
        })

       })
       .catch((err) =>{
        reject(Errors.InternalServerError(err))
       })
    })
  }

  async specificMonAvgWH (mon,empId) {
    return new Promise(async (resolve,reject) =>{
      const currYear = new Date().getFullYear()

       await models.Worklog.findAll(
        {
          where:{
            empId:empId,
            in:{
              [Op.and]: {
                [Op.gte]: new Date(`${currYear}-${Number(mon)}-01`),
                [Op.lt]: new Date(`${currYear}-${Number(mon)+1}-01`),
              },
            }
          }
        }
       )
       .then(async (Days) =>{
        const whArr = Days.map(l => l.workingHours)
        const totalhrs = whArr.reduce((total,wh) => total+wh)
        const avgHrs = totalhrs / (Days.length)
        
        resolve({
          totalDays : leaves.length,
          totalhrs: totalhrs,
          avrageHours: avgHrs
        })

       })
       .catch((err) =>{
        reject(Errors.InternalServerError(err))
       })

    })
  }
}

module.exports = empService;
