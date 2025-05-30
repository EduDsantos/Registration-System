const mongoose = require('mongoose')

const alunosSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    idade: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    telefone: { type: String, required: true },
    cpf: { type: Number, required: true, unique: true },
    faixa: { type: String, required: true },
    resMedic: { type: String, required: false },
    dataCadastro: { type: Date, default: Date.now },
    dataPagamento: { type: Date },
    diaVencimento: { type: Date }
    // statusPagamento:{type: Boolean,default: false}
})

module.exports = mongoose.model("alunos", alunosSchema)