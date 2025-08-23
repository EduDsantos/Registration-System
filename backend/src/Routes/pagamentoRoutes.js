const express = require('express')
const router = express.Router()
const pagamentoController = require('../Controllers/pagamentoController');
const autenticarToken = require('../AuthMiddleware/authMiddleware');

// Criar pagamento
router.post('/', pagamentoController.criarPagamento);

// Listar todos os pagamentos
router.get('/', pagamentoController.listarPagamentos);

// Listar pagamentos de um aluno específico
router.get('/aluno/:alunoId', pagamentoController.listarPagamentosAluno);

// Marcar pagamento como pago
router.put('/:id/pagar', pagamentoController.marcarPago);

// Reverter pagamento (de volta para pendente)
router.put('/:id/desmarcar', pagamentoController.desmarcarPago);
// router.get("/pendentes/contagem", pagamentoController.listarPendentes);
// Deletar pagamento
router.delete('/:id', pagamentoController.deletarPagamento);

// Listar apenas pendentes
router.get('/pendentes', pagamentoController.pagamentosPendentes);

// Listar apenas atrasados
router.get('/atrasados', pagamentoController.listarAtrasados);



module.exports = router
