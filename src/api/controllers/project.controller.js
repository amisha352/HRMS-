const { ProjectService } = require("../services");
const projectService = new ProjectService();

const createProject = async (req, res, next) => {
  await projectService
    .createProject(req.body, res.locals.userData.id)
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
const getEmps = async (req, res, next) => {
  await projectService
    .getEmps(req.params.id)
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
const projectDone = async (req, res, next) => {
  await projectService
    .projectDone(req.params.id, res.locals.userData.id)
    .then((response) => {
      res.status(200).json({
        status: true,
        message: "status updated",
      });
    })
    .catch((err) => {
      next(err);
    });
};

const updateProStatus = async (req, res, next) => {
  await projectService
    .updateProStatus(req.params.id, req.query.status)
    .then((response) => {
      res.status(200).json({
        status: true,
        message: `status ${req.query.status}`,
      });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = {
  createProject,
  getEmps,
  projectDone,
  updateProStatus,
};
