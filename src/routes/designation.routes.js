const express = require('express')
const { dsgController } = require('../api/controllers')
const checkPermission = require('../middlewares/checkPermission')
// const { authToken } = require('../middlewares/authorization')
// const restrictedToAdmin = require('../middlewares/ristrictedToAdmin')

const router = express.Router()

router.post("/create-dsg",checkPermission("canCreate"),dsgController.createDsg)
router.patch("/update-dsg/:id",checkPermission("canUpdate"),dsgController.updateDsg)
router.get("/getAll",checkPermission("canRead"),dsgController.getAll)
router.get("/getById/:id",checkPermission("canRead"),dsgController.getById)
router.delete("/delete-dsg/:id",checkPermission('canDelete'),dsgController.deleteDsg)

module.exports = router