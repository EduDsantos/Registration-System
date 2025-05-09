const treinador = require('../Models/treinador')
const jwt = require('jsonwebtoken')

const loginService = (email) => treinador.findOne({email: email}).select("+senha")



const generateToken = (id) => jwt.sign({id: id}, process.env.JWT_SECRET, {expiresIn: 86400})

module.exports = {loginService, generateToken}