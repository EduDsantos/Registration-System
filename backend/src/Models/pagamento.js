const mongoose = require('mongoose')

const pagamentosSchema = new mongoose.Schema({
    alunoId: { type: mongoose.Schema.Types.ObjectId, ref: "alunos", required: true },
    valor: { type: Number, required: true },
    status: { type: String, enum: ["pendente", "pago", "atrasado"], default: "pendente" },
    dataPagamento: { type: Date, default: Date.now() },
    dataVencimento: { type: Date, required: true },
    metodoPagamento: { type: String, default:'PIX'},
})

module.exports = mongoose.model("Pagamento", pagamentosSchema)