const { DepartmentService } = require("../services");
const dptService = new DepartmentService();

const createDpt = async (req, res, next) => {
  if (!req.body.name) {
    res.status(400).json({
      status: false,
      message: "missing required fields",
    });
  }
  await dptService
    .createDpt(req.body)
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
const getAll = async (req, res, next) => {
  await dptService
    .getAll()
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
const getById = async (req, res, next) => {
  await dptService
    .getById(req.params.id)
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

const deleteDepartment = async (req,res,next) =>{
  await dptService.deleteDepartment(req.parms.id)
  .then((response) =>{
    res.status(200).json({
      status:true,
      message:"Department has been deleted"
    })
  })
  .catch((err) =>{
    next(err)
  })
}
const updateDepartment  = async (req,res,next) =>{
  await dptService.updateDepartment(req.body,req.params.id)
  .then((response) =>{
    res.status(200).json({
      status:true,
      message:'Department has been updated'
    })
  })
  .catch((err) =>{
    next(err)
  })
}

module.exports = {
  createDpt,
  getAll,
  getById,
  deleteDepartment,
  updateDepartment
};
