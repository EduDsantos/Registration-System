import mongoose from "mongoose";

const pagamentosSchema = new mongoose.Schema({
    alunoId: { type: mongoose.Schema.Types.ObjectId, ref: "Aluno", required: true },
    valor: { type: Number, required: true },
    vencimento: { type: Date, required: true },
    status: { type: String, enum: ["pendente", "pago", "atrasado"], default: "pendente" },
    dataPagamento: { type: Date, default: null },
    metodoPagamento: { type: String, default: null },
    dataVencimento:{ type: }
})

module.exports = mongoose.model("Pagamento", pagamentosSchema)