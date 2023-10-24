const Errors = require("../../errors");
const models = require("../models");
const { Op } = require("sequelize");

class salaryService {
  async slarySlip(empId) {
    return new Promise(async (resolve, reject) => {
      await models.User.findOne({
        where: { id: empId },
        attributes: ["dptId", "dsgId", "workingDays", "workingHours"],
        include: [
          {
            model: models.Designation,
          },
        ],
      })
        .then(async (emp) => {
          const currYear = new Date().getFullYear();
          const currMon = new Date().getMonth() + 1;
         
          await models.Leave.findAll({
            where: {
              empId:empId,
              leaveDay: {
                [Op.and]: {
                  [Op.gte]: new Date(`${currYear}-${currMon}-01`),
                  [Op.lt]: new Date(`${currYear}-${currMon + 1}-01`),
                },
              },
            },
          })
            .then(async (leaves) => {
           
              const paidLv = await leaves.filter((l) => {
                return l.leaveType == "paid" && l.status == "approved";
              }).length;

              const unpaidLv = await leaves.filter((l) => {
                return l.leaveType == "unpaid" && l.status == "approved";
              }).length;

              
              const amount = emp.Designation.salary - unpaidLv * 500;

              await models.Salary.create({
                empId: empId,
                amount: amount,
                dptId: emp.dptId,
                totalLeaves: leaves.length,
                workingDays: emp.workingDays,
                workingHours: emp.workingHours,
              })
                .then((salary) => {
                  resolve(
                    {
                      id: salary.id,
                      empId: empId,
                      amount: amount,
                      totalLeaves: leaves.length,
                      paidLeave: paidLv,
                      unpaidLv: unpaidLv,
                      totalSalary: emp.Designation.salary,
                      dedudctedAmount: unpaidLv * 500,
                      workingDays: emp.workingDays,
                      workingHours: emp.workingHours,
                    },
                    salary
                  );
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

  async countSalary (empId) {
    return new Promise(async (resolve,reject) => {

      await models.User.findOne({
        where:{id:empId},
        attributes:['dptId','dsgId','workingDays','workingHours'],
        include:[{
          model:models.Designation,
          attributes:['salary']
        }]
      })
      .then(async (emp) => {
         const currMon = new Date().getMonth() + 1;
         const currYear = new Date().getFullYear();

         await models.Leave.findAll({
          where: {
            empId:empId,
            status:"approved",
            leaveDay: {
              [Op.and]: {
                [Op.gte]: new Date(`${currYear}-${currMon}-01`),
                [Op.lt]: new Date(`${currYear}-${currMon + 1}-01`),
              },
            },
          },
        })
        .then( async (leaves) =>{
         const paidLeaves = await leaves.filter((l) => {
            return l.leaveType == "paid" && l.status == "approved";
          }).length;
          console.log(">>>>paid",paidLeaves)

          const unpaidLeaves = await leaves.filter((l) =>{
            return l.leaveType == "paid" && l.status == "approved";
          }).length;

          const yc = await models.YearlyCalendar.findOne({
            where:{id:currMon}
          })
          const empWorkingDays = await models.Worklog.findAll({
            where:{
              empId:empId,
              in:{
                [Op.and]: {
                  [Op.gte]: new Date(`${currYear}-${currMon}-01`),
                  [Op.lt]: new Date(`${currYear}-${currMon + 1}-01`),
                },
              },
            },
          })
           console.log(">>>unpaidLeave",unpaidLeaves)
          // console.log(">>emp_WOrkingday",empWorkingDays.length)
          console.log(">>emp-workingDays",empWorkingDays.length)
          console.log(">>total",yc.workingDays)
         
        
          const oneDaySalary = (emp.Designation.salary/yc.workingDays).toFixed(2) ;
          const amount =   emp.Designation.salary - unpaidLeaves * oneDaySalary; 
          

          await models.Salary.create({
            empId: empId,
            amount: amount,
            dptId: emp.dptId,
            totalLeaves: leaves.length,
            workingDays: empWorkingDays.length,
            workingHours: emp.workingHours,
            
          })
          .then((salary) =>{
            resolve(
              {
                id: salary.id,
                empId: empId,
                amount: amount,
                totalLeaves: leaves.length,
                paidLeave: paidLeaves,
                unpaidLv: unpaidLeaves,
                totalSalary: emp.Designation.salary,
                dedudctedAmount: unpaidLeaves * oneDaySalary,
                totalWorkingDays:yc.workingDays,
                workingDays: empWorkingDays.length,
                workingHours: emp.workingHours,
                
              },
           
            );
          })
          .catch((err) =>{
            reject(Errors.InternalServerError(err))
          })

        })
        .catch((err) =>{
          reject(Errors.InternalServerError(err))
        })
      })
      .catch((err) =>{
        reject(Errors.InternalServerError(err))
      })
       
    })
  }

  async dptSalary(dptId) {
    return new Promise(async (resolve, reject) => {
      await models.Salary.findAll({
        where: { dptId: dptId },
        attributes: ["amount"],
      })
        .then((salaries) => {
          console.log(salaries);
          const amArr = salaries.map((s) => {
            return s.amount;
          });

          const total1 = amArr.reduce((total, salary) => {
            return total + salary;
          });

          resolve(total1);
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }

  async empSalary (id) {
    return new Promise(async (resolve,reject) =>{
       await models.Salary.findAll({
        where:{empId:id}
       })
       .then((salries) =>{
          resolve(salries)
       })
       .catch((err) =>{
        reject(Errors.InternalServerError(err))
       })
    })
  }
}



module.exports = salaryService;
