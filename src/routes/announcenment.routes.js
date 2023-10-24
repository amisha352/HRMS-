const express = require('express')
const { ancController } = require('../api/controllers')
const checkPermission = require('../middlewares/checkPermission')
// const { authToken } = require('../middlewares/authorization')
// const restrictedToManager = require('../middlewares/restrictedToManager')

const router = express.Router()

router.post("/create-anc",checkPermission("canCreate"),ancController.createAnc)
router.get("/get-latest",checkPermission("canRead"),ancController.getLatest)
router.get('/get-this-month',checkPermission("canRead"),ancController.getThisMonth)

module.exports = router