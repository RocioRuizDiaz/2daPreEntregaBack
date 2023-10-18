const jwt = require('jsonwebtoken');
const PRIVATE_KEY = 'CoderKey';

const generateToken = (user) => {
    const token = jwt.sign({user}, PRIVATE_KEY, {expiresIn: "24h"})
    return token
}

const authToken = (req, res, next) => {
    const autHeader = req.headers.authorization
    if(!autHeader) return res.status(104).send({erro: "No autenticado"})

    const token = autHeader.split(" ")[1]
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if(error) return res.status(403).send({error: "No autorizado"})
        req.user = credentials.user
        next()
    })
}

module.exports = ({
    generateToken,
    authToken,
})