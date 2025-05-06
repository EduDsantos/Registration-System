const mongoose = require('mongoose')

const treinadorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    sobrenome: {type: String, required: true},
    email: {type: String, required: true},
    senha: {type: String, required: true, select: false},
    faixa: {type: String, required: false},
    dataCadastro: {type: Date, required: false}

})

module.exports = mongoose.model("treinador", treinadorSchema)