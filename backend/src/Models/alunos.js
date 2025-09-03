const mongoose = require('mongoose')

const alunosSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    idade: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    telefone: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    faixa: { type: String, required: true },
    resMedic: { type: String, required: false },
    mensalidade: { type: Number, required: true },
    dataCadastro: { type: Date, default: Date.now },
    dataPagamento: { type: Date, default: Date.now },
    ativo: { type: Boolean, default: true },
    pago: { type: Boolean, default: false }
}, {timestamps: true})



module.exports = mongoose.model("alunos", alunosSchema)