const { AncService } = require("../services");
const ancService = new AncService();

const createAnc = async (req, res, next) => {
  await ancService
    .createAnc(req.body)
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

const getLatest = async (req, res, next) => {
  await ancService
    .getLatest()
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

const getThisMonth = async (req, res, next) => {
  await ancService
    .getThisMonth()
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

module.exports = {
  createAnc,
  getLatest,
  getThisMonth,
};
