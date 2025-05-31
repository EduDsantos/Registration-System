const mongoose = require('mongoose')
const Pagamento = require('../Models/pagamento')

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


const listarPagamentos = async (req, res) => {
    try {
        const pagamentos = await Pagamento.find().populate('alunoId')
        res.status(200).json({ pagamentos })
    } catch (error) {
        console.error("Erro ao listar pagamentos:", error)
        res.status(500).json({ error: "Erro ao listar pagamentos" })
    }
}

const pagamentosPendentes = async (req, res) => {
    try {
        const pagamentos = await Pagamento.find({ status: 'pendente' }).populate('alunoId')
        res.status(200).json(pendente)
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar pagamentos pendentes" })
    }
}

const listarPagos = async (req, res) => {
    try {
        const pagamentos = await Pagamento.find({ status: 'pago' }).populate('alunoId')
        res.status(200).json(pagos)
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar pagamentos pagos" })
    }
}

const listarAtrasados = async (req, res) => {
    try {
        const pagamentos = (await Pagamento.find({ status: 'atrasado' })).populate('alunoId')
        res.status(200), json(atrasado)
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar pagamentos atrasados" })
    }
}


const listarPagamentosAluno = async (req, res) => {
    try {
        const pagamentos = await Pagamento.find({ alunoId: req.params.alunoId })
        res.status(200).json({ pagamentos })
    } catch (error) {
        console.error('Erro ao listar pagamento do aluno')
        res.status(500).json({ error: "Erro ao listar pagamento do aluno" })
    }
}


const deletarPagamento = async (req, res) => {
    try {
        const pagamentos = await Pagamento.findByIdAndDelete(id)

        if (!pagamentos) return res.status(404).json({ erro: "Pagamento não encontrado" })
        res.status(200).json({ mensagem: "Pagamento deletado com sucesso!" })
    } catch (error) {
        res.status(500).json({ error: "Erro ao tentar deletar o pagamento" })
    }
}

const marcarPago = async (req, res) => {
    try {
        const pagamento = await Pagamento.findById(req.params.id)

        if (!pagamento) {
            return res.status(404).json({ error: "Pagamento não encontrado" })
        }
        pagamento.status = 'Pago'
        pagamento.dataPagamento = new Date()
        pagamento.metodoPagamento = req.body.metodoPagamento || "Não informado"

        await pagamento.save()

        res.status(200).json(pagamento)
    } catch (error) {
        console.error("Erro ao atualizar pagamento")
        res.status(500).jsos({ error: "Erro ao atualizar pagamento" })
    }
}



module.exports = { criarPagamento, listarPagamentos, pagamentosPendentes, listarPagos, listarAtrasados, listarPagamentosAluno, marcarPago, deletarPagamento }