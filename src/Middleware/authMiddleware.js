const jwt = require('jsonwebtoken')
const treinador = require('../Models/treinador')


function autenticarToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) return res.status(401).json({ message: 'Token não fornecido'})

        jwt.verify(token, process.env.JWT_SECRET, (err, treinador))

        req.treinador = treinador
        next()
}

module.exports = autenticarToken