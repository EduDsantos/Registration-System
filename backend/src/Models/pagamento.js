const mongoose = require('mongoose')

const pagamentoSchema = new mongoose.Schema({
  alunoId: { type: mongoose.Schema.Types.ObjectId, ref: "alunos", required: true },
  valor: { type: Number, required: true },
  status: { type: String, enum: ["pendente", "pago"], default: "pendente" },
  dataPagamento: { type: Date }, // só preenche quando for pago
  dataVencimento: { type: Date, required: true },
  metodoPagamento: { type: String, default: "PIX" }
}, { timestamps: true })

module.exports = mongoose.model("Pagamento", pagamentoSchema)
