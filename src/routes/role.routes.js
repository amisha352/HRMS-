const express = require('express')
const { roleConroller } = require('../api/controllers')
const checkPermission = require('../middlewares/checkPermission')
// const { authToken } = require('../middlewares/authorization')
// const restrictedToAdmin = require('../middlewares/ristrictedToAdmin')

const router = express.Router()

router.post("/create-role",checkPermission("canCreate"),roleConroller.createRole)
router.get("/get-all",checkPermission("canRead"),roleConroller.getAll)
router.get("/getById/:id",checkPermission("canRead"),roleConroller.getById)
router.delete("/delete-role/:id",checkPermission("canDelete"),roleConroller.deleteRole)
router.put("/update-role/:id",checkPermission('canUpdate'),roleConroller.updateRole)

module.exports = router