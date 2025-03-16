const mongoose = require('mongoose')

const alunosSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true,
    },
    idade:{
        type: Number,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    telefone:{
        type: String,
        required: true,
    },
    cpf:{
        type:Number,
        required:true,
        unique: true
    },
    resMedic:{
        type: String,
        required: true
    },
    dataCadastro:{
        type:Date,
        default: Date.now,
    },
    statusPagamento:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("alunos", alunosSchema)