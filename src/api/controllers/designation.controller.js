const { DsgService } = require("../services");
const dsgService = new DsgService();

const createDsg = async (req, res, next) => {
  if (!req.body.name || !req.body.salary || !req.body.dptId) {
    res.status(400).json({
      status: false,
      message: "missing required fields",
    });
  }

  await dsgService
    .createDsg(req.body)
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
const updateDsg = async (req, res, next) => {
  await dsgService
    .updateDsg(req.body, req.params.id)
    .then((response) => {
      res.status(200).json({
        status: true,
        message: "Designation has been updated",
      });
    })
    .catch((err) => {
      next(err);
    });
};

const getAll = async (req, res, next) => {
  await dsgService
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
  await dsgService
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

const deleteDsg = async (req, res, next) => {
  await dsgService
    .deleteDsg(req.params.id)
    .then((rsp) => {
      res.status(200).json({
        status: true,
        message: "designation has been deleted",
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createDsg,
  updateDsg,
  getAll,
  getById,
  deleteDsg,
};
