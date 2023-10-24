const express = require('express')
const { ycController } = require('../api/controllers')
const checkPermission = require('../middlewares/checkPermission')
// const { authToken } = require('../middlewares/authorization')
// const restrictedToAdmin = require('../middlewares/ristrictedToAdmin')
const router = express.Router()


router.post("/create-month",checkPermission("canCreate"),ycController.createMonth)
router.patch('/update-month/:id',checkPermission("canUpdate"),ycController.updateMonth)
router.get("/get-all",checkPermission("canRead"),ycController.getAll)
module.exports = router