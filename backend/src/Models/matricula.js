const mongoose = require('mongoose');

const matriculasSchema = new mongoose.Schema({
    alunoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'alunos',
        required: true
    },
    dataMatricula: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("Matricula", matriculasSchema);  