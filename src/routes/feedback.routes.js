const express = require('express')
const { feedbackController } = require('../api/controllers')
const checkPermission = require('../middlewares/checkPermission')
// const { authToken } = require('../middlewares/authorization')
// const restrictedToManager = require('../middlewares/restrictedToManager')
const router = express.Router()

router.post('/create-feedback',checkPermission("canCreate"),feedbackController.createFb)
router.get('/created-by-manager/:id',checkPermission("canRead"),feedbackController.cretaedByMrg)


module.exports = router