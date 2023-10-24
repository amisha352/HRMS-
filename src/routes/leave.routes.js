const express = require('express')
const { leaveController } = require('../api/controllers')
const { authToken } = require('../middlewares/authorization')
const checkPermission = require('../middlewares/checkPermission')
// const restrictedToAdmin = require('../middlewares/ristrictedToAdmin')
const router = express.Router()

router.post("/request-leave",authToken,checkPermission("canCreate"),leaveController.requestLeave)
router.put("/approve-leave/:id",authToken,checkPermission("canUpdate"),leaveController.approveLeave)
router.put("/reject-leave/:id",authToken,checkPermission("canUpdate"),leaveController.rejectLeave)

module.exports = router