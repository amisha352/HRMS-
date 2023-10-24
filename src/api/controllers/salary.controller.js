const { SalaryService } = require("../services");
const salaryService = new SalaryService();

const salarySlip = async (req, res, next) => {
  await salaryService
    .slarySlip(req.params.id)
    .then((response) => {
      res.status(201).json({
        status: true,
        data: response,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const countSalary = async (req,res,next) =>{
  await salaryService.countSalary(req.params.id)
  .then((response) =>{
    res.status(200).json({
      status:true,
      data:response
    })
    
  })
  .catch((err) =>{
    next(err)
  })
}

const dptSalary = async (req, res, next) => {
  await salaryService
    .dptSalary(req.params.id)
    .then((response) => {
      res.status(200).json({
        status: true,
        data: response,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const empSalary = async (req,res,next) =>{
  await salaryService.empSalary(req.params.id)
  .then((response) =>{
    res.status(200).json({
      status:true,
      data:response
    })
  })
  .catch((err) =>{
    next(err)
  })
}

module.exports = {
  salarySlip,
  dptSalary,
  countSalary,
  empSalary
};
