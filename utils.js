const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const PRIVATE_KEY = 'CoderKey';



const createHash = password => 
bcrypt.hashSync(password, bcrypt.genSaltSync(10))
const isValidatePassword = (users, password) =>
 bcrypt.compareSync(password, users.password)

module.exports = {
    createHash,
    isValidatePassword
}
const generateToken = (users) => {
    const token = jwt.sign({users}, PRIVATE_KEY, {expiresIn: "24h"})
    return token
}

const authToken = (req, res, next) => {
    const autHeader = req.headers.authorization
    if(!autHeader) return res.status(104).send({erro: "No autenticado"})

    const token = autHeader.split(" ")[1]
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if(error) return res.status(403).send({error: "No autorizado"})
        req.users = credentials.users
        next()
    })
}

module.exports = ({
    generateToken,
    authToken,
})