const { ManagerService } = require("../services");
const managerService = new ManagerService();

const createManager = async (req, res, next) => {
  await managerService
    .createManager(req.params.id)
    .then((response) => {
      res.status(201).json({
        status: true,
        message: "manager is created",
        data: response,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const getAll = async (req, res, next) => {
  await managerService
    .getAll()
    .then((response) => {
      res.status(200).json({
        status: true,
        data: response,
      });
    })
    .catch((err) => {
      next({ err });
    });
};

module.exports = {
  createManager,
  getAll,
};
