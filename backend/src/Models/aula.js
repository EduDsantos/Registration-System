const mongoose = require('mongoose');

const presenca = new mongoose.Schema({
    data: { type: String, required: true },
    horario: {type: String, required: true },
    tipo: {type: String, required: true },
    alunosPresentes: [
        {
            id: {type: mongoose.Schema.Types.ObjectId, ref: 'alunos' },
            nome: {type: String},
            presente: {type: Boolean}
        }
    ],

}, { timestamps: true });

module.exports = mongoose.model("aula", presenca);