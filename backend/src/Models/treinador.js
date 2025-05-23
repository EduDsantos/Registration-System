const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const treinadorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sobrenome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true, select: false },
    faixa: { type: String, required: false },
    dataCadastro: { type: Date, required: false }

})

// treinadorSchema.pre('save', async function (next) {
//     if (!this.isModified('senha')) return next()
//     this.senha = await bcrypt.hash(this.senha, 10)n
//     next()
// })

module.exports = mongoose.model("treinador", treinadorSchema)