const express = require('express')
const router = express.Router()
const pagamentoController = require('../Controllers/pagamentoController')


router.post('/pagamentos', pagamentoController.criarPagamento)
router.get('/pagamentos', pagamentoController.listarPagamentos)
router.get('/pagamentos/aluno/:alunoId', pagamentoController.listarPagamentosAluno)
router.put('/pagamentos/:id', pagamentoController.marcarPago)
router.delete('/pagamentos:id', pagamentoController.deletarPagamento)
router.get('/pendentes/pagos', pagamentoController.listarPagos)
router.get('/pagamentos/atrasados', pagamentoController.listarAtrasados)
router.get('/pagamentos/pendentes', pagamentoController.pagamentosPendentes)


module.exports = router