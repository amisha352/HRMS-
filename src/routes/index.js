const express = require('express')
const router = express.Router()
const setRoute = require('../middlewares/setRoute')
const {authToken} = require('../middlewares/authorization')


router.use("/auth",require('./auth.routes'))
router.use("/role",authToken,setRoute("Role"),require("./role.routes"))
router.use("/manager",authToken,setRoute("Manager"),require('./manager.routes')) 
router.use("/department",authToken,setRoute("Department"),require('./dpt.roures')) 
router.use("/employee",authToken,setRoute("Employee"),require("./emp.routes")) 
router.use("/leave",setRoute('Leave'),require('./leave.routes'))   
router.use("/permission",setRoute('Permission'),require('./permission.routes'))  
router.use("/route",setRoute("Route"),require('./route.routes')) 
router.use("/yc",authToken,setRoute('Yc'),require('./yc.routes')) 
router.use('/salary',authToken,setRoute("Salary"),require('./salary.routes')) 
router.use('/designation',authToken,setRoute("Designation"),require('./designation.routes')) 
router.use('/anc',authToken,setRoute("Announcement"),require('./announcenment.routes')) 
router.use('/task',authToken,setRoute("Task"),require('./task.routes'))
router.use('/project',authToken,setRoute("Project"),require('./project.routes'))
router.use('/feedback',authToken,setRoute("Feedback"),require('./feedback.routes'))

module.exports = router