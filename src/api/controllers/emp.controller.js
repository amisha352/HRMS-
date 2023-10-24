const { EmpService } = require("../services");
const empService = new EmpService();

const getAll = async (req, res, next) => {
  await empService
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
  await empService
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
const markIn = async (req, res, next) => {
  await empService.markIn(res.locals.userData.id).then((flag) => {
    if (flag == true) {
      res.status(200).json({
        status: true,
        message: "Attendance Marked",
      });
    } else {
      res.status(400).json({
        status: false,
        data: null,
      });
    }
  });
};

const markOut = async (req, res, next) => {
  await empService
    .markOut(res.locals.userData.id)
    .then((response) => {
      res.status(200).json({
        status: true,
        message: "You can leave!",
        data: response,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const monthlyAvgWH = async (req,res,next) =>{

   await empService.monthlyAvgWH(req.params.id) 
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

const specificMonAvgWH = async (req,res,next) =>{

  await empService.specificMonAvgWH(req.params.id,req.query.month)
  .then((response) =>{
    res.status(200).json({
      status:true,
      data:response
    })

  })
  .catch((err)=>{
    next(err)
  })
}

module.exports = {
  getAll,
  markIn,
  markOut,
  getById,
  monthlyAvgWH,
  specificMonAvgWH
};
