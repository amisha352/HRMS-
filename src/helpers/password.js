const bcrypt = require('bcryptjs')

const hashPassword = (password) =>{
    return bcrypt.hashSync(password,8)
}

const validatePassword = (requestedPass,dbPass) =>{
    return bcrypt.compareSync(requestedPass,dbPass)
}

module.exports = {
    hashPassword,
    validatePassword
}