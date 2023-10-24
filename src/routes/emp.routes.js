const express = require('express')
const  { empController } = require('../api/controllers')
const checkPermission = require('../middlewares/checkPermission')
// const { authToken } = require('../middlewares/authorization')
const router = express.Router()

router.get("/getAll",checkPermission("canRead"),empController.getAll)
router.get("/getById/:id",checkPermission("canRead"),empController.getById)
router.put("/mark-in",checkPermission('canUpdate'),empController.markIn)
router.put("/mark-out",checkPermission('canUpdate'),empController.markOut)
router.get("/monthly-avg-wh/:id",checkPermission("canRead"),empController.monthlyAvgWH)
router.get("/specific-mon-avg-hrs/:id",checkPermission("canRead"),empController.specificMonAvgWH)



module.exports = router

