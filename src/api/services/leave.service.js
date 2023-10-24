const Errors = require("../../errors");
const models = require("../models");
const sendMail = require("../../helpers/mail");
const { Op } = require("sequelize");

class leaveService {
  async requestLeave(payload) {
    return new Promise(async (resolve, reject) => {
      console.log(payload.leaveDays);
      const lDays = payload.leaveDays.split(",");
      // console.log("leave Days",lDays)

      const checkMonth = async (lmon) => {
        const currMon = new Date().getMonth() + 1;
        const currYear = new Date().getFullYear();

        const leaves = await models.Leave.findAll({
          where: {
            empId: payload.empId,
            leaveDay: {
              [Op.and]: {
                [Op.gte]: new Date(`${currYear}-${lmon}-01`),
                [Op.lt]: new Date(`${currYear}-${lmon + 1}-01`),
              },
            },
          },
        });
        const approvedLeave = await leaves.filter((l) => {
          return l.status == "approved";
        }).length;
        console.log("approved leaves", approvedLeave);

        return {
          totalLeave: leaves.length,
          approvedLeave: approvedLeave,
        };
      };
      let lArr = [];
      for (let i = 0; i < lDays.length; i++) {
        const filterMonth = await checkMonth(new Date(lDays[i]).getMonth() + 1);

        const totalLeave = filterMonth.totalLeave;
        const approvedLeave = filterMonth.approvedLeave;
        if (totalLeave >= 2 && approvedLeave < 4) {
          const emp = await models.User.findOne({
            where: { id: payload.empId },
            attributes: ["mrgId"],
          });

          await models.Leave.create({
            content: payload.content,
            leaveDay: lDays[i],
            empId: payload.empId,
            leaveType: "unpaid",
            mrgId: emp.mrgId,
          })
            .then((leave) => {
              lArr.push(leave);
            })
            .catch((err) => {
              reject(Errors.InternalServerError(err));
            });
        } else if ((totalLeave == 1 || totalLeave == 0) && approvedLeave < 4) {
          const emp = await models.User.findOne({
            where: { id: payload.empId },
            attributes: ["mrgId"],
          });
          await models.Leave.create({
            content: payload.content,
            leaveDay: lDays[i],
            empId: payload.empId,
            mrgId: emp.mrgId,
          })

            .then((leave) => {
              lArr.push(leave);
            })
            .catch((err) => {
              reject(Errors.InternalServerError(err));
            });
        } else {
          lArr.push(`cannot take leave ${lDays[i]}`);
        }
      }

      resolve(lArr);
    });
  }

  async approveLeave(leaveId) {
    return new Promise(async (resolve, reject) => {
      await models.Leave.update(
        {
          status: "approved",
        },
        {
          where: { id: leaveId },
        }
      )
        .then(async (flag) => {
          const result = await models.Leave.findOne({
            where: { id: leaveId },
            include: [
              {
                model: models.User,
                attributes: ["email"],
              },
            ],
          });
          await sendMail(
            result.User.email,
            "Leave Approved",
            `leave on ${new Date(result.leaveDay).getDate()}-${
              new Date(result.leaveDay).getMonth() + 1
            }-${new Date(result.leaveDay).getFullYear()} has been approved`
          );

          resolve(
            `leave on ${new Date(result.leaveDay).getDate()}-${
              new Date(result.leaveDay).getMonth() + 1
            }-${new Date(result.leaveDay).getFullYear()} has been approved`
          );
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }

  async rejectLeave(leaveId) {
    return new Promise(async (resolve, reject) => {
      await models.Leave.update(
        {
          status: "rejected",
        },
        {
          where: { id: leaveId },
        }
      )
        .then(async (flag) => {
          const result = await models.Leave.findOne({
            where: { id: leaveId },
            include: [
              {
                model: models.User,
                attributes: ["email"],
              },
            ],
          });
          await sendMail(
            result.User.email,
            "Leave rejected",
            `leave on ${new Date(result.createdAt).getDate()}-${
              new Date(result.createdAt).getMonth() + 1
            }-${new Date(result.createdAt).getFullYear()} has been rejected`
          );
          resolve(
            `leave on ${new Date(result.createdAt).getDate()}-${
              new Date(result.createdAt).getMonth() + 1
            }-${new Date(result.createdAt).getFullYear()} has been rejected`
          );
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }
}

module.exports = leaveService;
