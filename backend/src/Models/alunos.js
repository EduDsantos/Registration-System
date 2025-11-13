const mongoose = require('mongoose')

const alunosSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    idade: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    telefone: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    modalidade: { type: String, required: true },
    faixa: {
        type: String,
        required: function () {
            return this.modalidade?.toLowerCase() !== 'muay thai';
        },
        default: 'N/A'
    },
    resMedic: { type: String, required: false },
    mensalidade: { type: Number, required: true },
    dataCadastro: { type: Date, default: Date.now },
    dataPagamento: { type: Date, default: Date.now },
    ativo: { type: Boolean, default: true },
    pago: { type: Boolean, default: false },
    historicoPresencas: [
        {
            aulaId: { type: mongoose.Schema.Types.ObjectId, ref: 'aula' },
            data: String,
            horario: String,
            presente: Boolean
        }
    ]
}, { timestamps: true })



module.exports = mongoose.model("alunos", alunosSchema)