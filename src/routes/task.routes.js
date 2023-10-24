const express = require('express')
const { taskController } = require('../api/controllers')
const checkPermission = require('../middlewares/checkPermission')
// const { authToken } = require('../middlewares/authorization')
// const restrictedToManager = require('../middlewares/restrictedToManager')
const router = express.Router()


router.post("/create-task",checkPermission("canCreate"),taskController.createTask)
router.patch("/task-done/:id",taskController.taskDone)
router.patch("/approve-task/:id",checkPermission("canUpdate"),taskController.approveTask)
router.patch("/reject-task/:id",checkPermission("canUpdate"),taskController.rejectTask)
router.get("/emp-task/:id",checkPermission("canRead"),taskController.empTask)

module.exports = router