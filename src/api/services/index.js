const AuthService = require("./auth.service");
const RoleService = require("./role.service");
const DepartmentService = require("./dpt.service");
const ManagerService = require("./manager.service");
const EmpService = require("./emp.service");
const LeaveService = require("./leave.service");
const YcService = require("./yc.service");
const SalaryService = require("./salary.service");
const DsgService = require("./designation.service");
const AncService = require("./announcenment.service");
const TaskService = require("./task.service");
const ProjectService = require("./project.service");
const FeedBackService = require("./feedback.service");
const PermissionService = require('./permission.service')
const RouteService = require('./route.service')

module.exports = {
  RoleService,
  DepartmentService,
  ManagerService,
  AuthService,
  EmpService,
  LeaveService,
  YcService,
  SalaryService,
  DsgService,
  AncService,
  TaskService,
  ProjectService,
  FeedBackService,
  PermissionService,
  RouteService
};
