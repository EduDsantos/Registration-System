const treinador = require('../Models/treinador')

const loginService = (email) => treinador.findOne({email: email}).select("+senha")

module.exports = {loginService}