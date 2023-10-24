const { YcService } = require("../services");
const ycService = new YcService();

const createMonth = async (req, res, next) => {
  await ycService
    .createMonth(req.body)
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
const updateMonth = async (req, res, next) => {
  await ycService
    .updateMonth(req.params.id, req.body)
    .then((response) => {
      res.status(200).json({
        status: true,
        message: "month updated",
      });
    })
    .catch((err) => {
      next(err);
    });
};

const getAll = async (req,res,next) =>{

  await ycService.getAll()
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
  createMonth,
  updateMonth,
  getAll
};
