const express = require('express')
const router = express.Router()
const pagamentoController = require('../Controllers/pagamentoController')


router.post('/', pagamentoController.criarPagamento);
router.get('/', pagamentoController.listarPagamentos);
router.get('/aluno/:alunoId', pagamentoController.listarPagamentosAluno);
// router.put('/:id', pagamentoController.marcarPago);
router.put('/pagamentos/:id/pagar', pagamentoController.marcarPago)
router.delete('/:id', pagamentoController.deletarPagamento);
router.get('/pendentes/pagos', pagamentoController.listarPagos);
router.get('/atrasados', pagamentoController.listarAtrasados);
router.get('/pendentes', pagamentoController.pagamentosPendentes);



module.exports = router