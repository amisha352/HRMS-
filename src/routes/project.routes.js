const express = require('express')
const { projectController } = require('../api/controllers')
const checkPermission = require('../middlewares/checkPermission')
// const { authToken } = require('../middlewares/authorization')
// const restrictedToManager = require('../middlewares/restrictedToManager')
// const restrictedToAdmin = require('../middlewares/ristrictedToAdmin')
const router = express.Router()

router.post("/create-project",checkPermission("canCreate"),projectController.createProject)
router.get("/get-emps/:id",checkPermission("canRead"),projectController.getEmps)
router.patch('/project-done/:id',checkPermission("canUpdate"),projectController.projectDone)
router.patch('/update-status/:id',checkPermission('canUpdate'),projectController.updateProStatus)

module.exports = router