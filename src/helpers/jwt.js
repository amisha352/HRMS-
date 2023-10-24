const jwt = require('jsonwebtoken')

const signJwt = (payload,expTime) =>{
    return jwt.sign({
        id:payload.id,
        email:payload.email,
        role:payload.roleId
    },process.env.JWT_SECRET,{
        expiresIn:'7d'
    })
}

const verifyJwt = (token) => jwt.verify(token,process.env.JWT_SECRET)

module.exports = {
    signJwt,
    verifyJwt
}