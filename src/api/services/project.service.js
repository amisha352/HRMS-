const Errors = require("../../errors");
const models = require("../models");

class projectService {
  async createProject(payload, mrgId) {
    return new Promise(async (resolve, reject) => {
      const empArr = payload.emps.split(",");
      await models.Project.create({
        description: payload.discription,
        emps: empArr,
        deadLine: payload.deadLine,
        dptId: payload.dptId,
        mrgId: mrgId,
      })
        .then((project) => {
          resolve(project);
        })
        .then((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }

  async getEmps(id) {
    return new Promise(async (resolve, reject) => {
      await models.Project.findOne({
        where: { id: id },
        attributes: ["emps"],
      }).then(async (project) => {
        let emps = [];
        for (let i = 0; i < project.emps.length; i++) {
          await models.User.findOne({
            where: { id: project.emps[i] },
            attributes: ["id", "fullName", "email"],
            include: [
              {
                model: models.Role,
                attributes: ["name"],
              },
              {
                model: models.Designation,
                attributes: ["name"],
              },
              {
                model: models.Department,
                attributes: ["name"],
              },
            ],
          })
            .then((emp) => {
              emps.push(emp);
            })
            .catch((err) => {
              reject(Errors.InternalServerError(err));
            });
        }

        resolve(emps);
      });
    });
  }
  async projectDone(id, mrgId) {
    return new Promise(async (resolve, reject) => {
      await models.Project.findOne({
        where: { id },
      })
        .then(async (project) => {
          if (project.mrgId == mrgId) {
            await models.Project.update(
              { status: "done" },
              { where: { id: id } }
            )
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

  async updateProStatus(id, status) {
    return new Promise(async (resolve, reject) => {
      await models.Project.update({ status: status }, { where: { id: id } })
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }
}

module.exports = projectService;
