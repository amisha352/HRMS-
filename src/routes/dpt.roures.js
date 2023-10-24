const express = require('express')
const { dptController } = require('../api/controllers')
const checkPermission  = require('../middlewares/checkPermission')
// const { authToken } = require("../middlewares/authorization")
// const restrictToAdmin = require('../middlewares/ristrictedToAdmin')

const router = express()

router.post("/create-department",checkPermission("canCreate"),dptController.createDpt)
router.get("/getAll",checkPermission('canRead'),dptController.getAll)
router.get("/getById/:id",checkPermission('canRead'),dptController.getById)
router.delete("/delete-department/:id",checkPermission('canDelete'),dptController.deleteDepartment)
router.put("/update-department/:id",checkPermission('canUpdate'),dptController.updateDepartment)


module.exports = router