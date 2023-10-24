const { TaskService } = require("../services");
const taskService = new TaskService();

const createTask = async (req, res, next) => {
  await taskService
    .createTask(req.body, res.locals.userData.id)
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
const taskDone = async (req, res, next) => {
  await taskService
    .taskDone(req.params.id, res.locals.userData.id)
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

const approveTask = async (req, res, next) => {
  await taskService
    .approveTask(req.params.id, res.locals.userData.id)
    .then((response) => {
      res.status(200).json({
        status: true,
        message: "Task approved",
      });
    })
    .catch((err) => {
      next(err);
    });
};

const rejectTask = async (req, res, next) => {
  await taskService
    .rejectTask(req.params.id, res.locals.userData.id)
    .then((response) => {
      res.status(200).json({
        status: true,
        message: "Task rejected",
      });
    })
    .catch((err) => {
      next(err);
    });
};

const empTask = async (req,res,next) =>{

  await taskService.empTask(req.params.id)
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
  createTask,
  taskDone,
  approveTask,
  rejectTask,
  empTask
};
