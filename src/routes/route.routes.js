const express = require("express");
const { routeController } = require("../api/controllers");
const { authToken } = require("../middlewares/authorization");
const checkPermmisions = require("../middlewares/checkPermission");
const router = express.Router();

router.post(
  "/create-route",
  authToken,
  checkPermmisions("canCreate"),
  routeController.createRoute
);
router.put(
  "/update-route/:id",
  authToken,
  checkPermmisions("canUpdate"),
  routeController.updateRoute
);
router.delete(
  "/delete-route/:id",
  authToken,
  checkPermmisions("canDelete"),
  routeController.deleteRoute
);
router.get(
  "/getAll",
  authToken,
  checkPermmisions("canRead"),
  routeController.getAll
);
router.get(
  "/getById/:id",
  authToken,
  checkPermmisions("canDelete"),
  routeController.getById
);

module.exports = router;
