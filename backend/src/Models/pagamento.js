const mongoose = require('mongoose')

const pagamentosSchema = new mongoose.Schema({
    alunoId: { type: mongoose.Schema.Types.ObjectId, ref: "Aluno", required: true },
    valor: { type: Number, required: true },
    vencimento: { type: Date, required: true },
    status: { type: String, enum: ["pendente", "pago", "atrasado"], default: "pendente" },
    dataPagamento: { type: Date, default: null },
    dataVencimento: { type: Date, required: true },
    metodoPagamento: { type: String, default: null },
})

module.exports = mongoose.model("Pagamento", pagamentosSchema)