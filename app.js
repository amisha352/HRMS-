const express = require('express');
const errorHandler = require("./src/middlewares/errorHandler")
const endPointNotFound = require("./src/middlewares/endPointNotFound")

const app = express()

app.use(express.urlencoded({extended:true}))

app.use("/api",require("./src/routes"))

app.use(errorHandler)
app.use(endPointNotFound)
module.exports = app
