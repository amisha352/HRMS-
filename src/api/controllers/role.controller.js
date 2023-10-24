const { RoleService } = require("../services");
const roleService = new RoleService();

const createRole = async (req, res, next) => {
  if (!req.body.name) {
    res.status(400).json({
      status: false,
      message: "missing required fields",
    });
  }

  await roleService
    .createRole(req.body)
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
  await roleService
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
  await roleService
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

const updateRole = async (req, res, next) => {
  const payload = {
    name: req.body.name,
    id: req.params.id,
  };

  await roleService
    .updateRole(payload)
    .then((response) => {
      res.status(200).json({
        status: true,
        message: "role has been updated",
      });
    })
    .catch((err) => {
      next(err);
    });
};
const deleteRole = async (req, res, next) => {
  await roleService
    .deleteRole(req.params.id)
    .then((response) => {
      res.status(200).json({
        status: true,
        message: "role has been deleted",
      });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = {
  createRole,
  getAll,
  getById,
  updateRole,
  deleteRole,
};
