require("dotenv").config({path:'./.env'})
const PORT = process.env.PORT || 8000
const app = require("./app")
const { sequelize } = require("./src/api/models")
app.listen(PORT,()=>{
     
    sequelize.authenticate().then(
        ()=>{
            console.log('DB connection has been established successfully.');
        },
        (err)=>{
            console.log('Unable to connect to the database:', err);
        }
    )
    console.log(`server is started on port ${PORT}`)

})

