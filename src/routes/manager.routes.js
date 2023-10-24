const express = require('express')
const { managerController } = require("../api/controllers")
const router = express.Router()
const checkPermission = require('../middlewares/checkPermission')
// const { authToken } = require("../middlewares/authorization")
// const restrictToAdmin = require("../middlewares/ristrictedToAdmin")

router.put("/create-manager/:id",checkPermission('canCreate'),managerController.createManager)
router.get("/getAll",checkPermission('canRead'),managerController.getAll)

module.exports = router