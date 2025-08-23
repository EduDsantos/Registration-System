const Pagamento = require('../Models/pagamento')

// Criar pagamento
const criarPagamento = async (req, res) => {
  try {

    const novoPagamento = new Pagamento(req.body)
    await novoPagamento.save()
    res.status(201).json(novoPagamento)
  } catch (error) {
    console.error('Erro ao criar pagamento', error)
    res.status(500).json({ error: 'Erro ao tentar criar pagamento' })
  }
}

// Listar todos
const listarPagamentos = async (req, res) => {
  try {
    const pagamentos = await Pagamento.find().populate('alunoId')
    res.status(200).json(pagamentos)
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar pagamentos" })
  }
}

// Listar pendentes (em aberto, ainda não pagos)
const pagamentosPendentes = async (req, res) => {
  try {
    // pagamentos pendentes
    const totalPendentes = await Pagamento.countDocuments({ status: "pendente" })

    res.status(200).json(totalPendentes)
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar pagamentos pendentes" })
  }
}

const listarPendentes = async (req, res) => {
  try {
    const pendentes = await Pagamento.find({ status: "pendente" }).populate("alunoId");
    
    res.json(pendentes);
  } catch (error) {
    console.error("Erro ao buscar pendentes:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Listar atrasados (pendentes cujo vencimento já passou)
const listarAtrasados = async (req, res) => {

  try {
    const hoje = new Date()
    const atrasados = await Pagamento.find({
      status: 'pendente',
      dataVencimento: { $lt: hoje },
      pago: false
    }).populate('alunoId')
    res.status(200).json(atrasados)
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pagamentos atrasados" })
  }
}

// Listar apenas os pagos
const listarPagos = async (req, res) => {
  try {
    const pagos = await Pagamento.find({ status: 'pago' }).populate('alunoId')
    res.status(200).json(pagos)
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pagamentos pagos" })
  }
}

// Listar pagamentos de um aluno
const listarPagamentosAluno = async (req, res) => {
  try {
    const pagamentos = await Pagamento.find({ alunoId: req.params.alunoId })
    res.status(200).json(pagamentos)
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar pagamento do aluno" })
  }
}

// Marcar como pago
const marcarPago = async (req, res) => {
  try {
    const pagamento = await Pagamento.findById(req.params.id)
    
    if (!pagamento) {
      return res.status(404).json({ error: "Pagamento não encontrado" })
    }
    
    // 1. Marcar o pagamento atual como pago
    pagamento.status = "pago"
    pagamento.dataPagamento = new Date()
    pagamento.metodoPagamento = req.body.metodoPagamento || pagamento.metodoPagamento
    await pagamento.save()
    const pagamentoAntigo = pagamento

    // 2. Criar nova parcela para o próximo mês
    const dataVencimentoAtual = pagamento.dataVencimento
    const novaData = new Date(
      dataVencimentoAtual.getFullYear(),
      dataVencimentoAtual.getMonth() + 1,
      dataVencimentoAtual.getDate()
    )

    pagamentoAntigo.deleteOne(Pagamento.find())

    const novoPagamento = new Pagamento({
      alunoId: pagamento.alunoId,
      valor: pagamento.valor,
      dataVencimento: novaData,
      status: "pendente"
    })

    await novoPagamento.save()

    res.status(200).json({
      mensagem: "Pagamento marcado como pago e nova parcela criada",
      pagamentoAtualizado: pagamento,
      novoPagamento
    })
  } catch (error) {
    console.error("Erro ao marcar pagamento:", error)
    res.status(500).json({ error: "Erro ao atualizar pagamento" })
  }
}
// Reverter para pendente
const desmarcarPago = async (req, res) => {
  try {
    const pagamento = await Pagamento.findById(req.params.id)
    if (!pagamento) return res.status(404).json({ error: "Pagamento não encontrado" })

    pagamento.status = 'pendente'



    pagamento.dataPagamento = null

    await pagamento.save()
    res.status(200).json(pagamento)
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar pagamento" })
  }
}

// Deletar
const deletarPagamento = async (req, res) => {
  try {
    const { id } = req.params
    const pagamento = await Pagamento.findByIdAndDelete(id)
    if (!pagamento) return res.status(404).json({ erro: "Pagamento não encontrado" })

    res.status(200).json({ mensagem: "Pagamento deletado com sucesso!" })
  } catch (error) {
    res.status(500).json({ error: "Erro ao tentar deletar o pagamento" })
  }
}

module.exports = {
  criarPagamento,
  listarPagamentos,
  pagamentosPendentes,
  listarAtrasados,
  listarPagos,
  listarPagamentosAluno,
  marcarPago,
  desmarcarPago,
  listarPendentes,
  deletarPagamento
}
