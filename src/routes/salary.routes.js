const express = require('express')
const { salaryController } = require('../api/controllers')
const checkPermission = require('../middlewares/checkPermission')
// const { authToken } = require('../middlewares/authorization')

const router = express.Router()

router.post("/salary-slip/:id",checkPermission('canCreate'),salaryController.salarySlip)
router.get("/dpt-salary/:id",checkPermission('canRead'),salaryController.dptSalary)
router.post("/count-salary/:id",checkPermission('canCreate'),salaryController.countSalary)
router.get("/empSalary/:id",checkPermission("canRead"),salaryController.empSalary)

module.exports = router