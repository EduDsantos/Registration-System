const treinador = require('../Models/treinador')
const jwt = require('jsonwebtoken')

const loginService = async (email) => {
    return await  treinador.findOne({email: email}).select("+senha")
}

const generateToken = (id) => jwt.sign({id: id}, process.env.JWT_SECRET, {expiresIn: 86400})

module.exports = {loginService, generateToken}