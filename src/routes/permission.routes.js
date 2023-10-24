const express = require("express");
const { permissionController } = require("../api/controllers");
const { authToken } = require("../middlewares/authorization");
const checkPermission = require("../middlewares/checkPermission");
const router = express.Router();

router.post(
  "/create-permission",
  authToken,
  checkPermission("canCreate"),
  permissionController.createPermission
);
router.put(
  "/update-permission/:id",
  authToken,
  checkPermission("canUpdate"),
  permissionController.updatePermission
);
router.delete(
  "/delete-permission/:id",
  authToken,
  checkPermission("canDelete"),
  permissionController.deletePermission
);
router.get("/getAll",
authToken,
checkPermission("canRead"),
permissionController.getAll)

router.get("/getById/:id",
authToken,
checkPermission('canRead'),
permissionController.getById)


module.exports = router;
