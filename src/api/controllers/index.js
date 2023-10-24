const authController = require("./auth.controller");
const roleConroller = require("./role.controller");
const managerController = require("./manager.controller");
const dptController = require("./dpt.controller");
const empController = require("./emp.controller");
const leaveController = require("./leave.controller");
const ycController = require("./yc.controller");
const salaryController = require("./salary.controller");
const dsgController = require("./designation.controller");
const ancController = require("./annuncement.controller");
const taskController = require("./task.controller");
const projectController = require("./project.controller");
const feedbackController = require("./feedBack.controller");
const permissionController = require('./permission.controller')
const routeController = require('./route.controller')

module.exports = {
  roleConroller,
  managerController,
  authController,
  dptController,
  empController,
  leaveController,
  ycController,
  salaryController,
  dsgController,
  ancController,
  taskController,
  projectController,
  feedbackController,
  permissionController,
  routeController
};
