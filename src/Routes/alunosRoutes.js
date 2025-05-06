const express = require("express")
const router = express.Router()
const alunoController = require('../Controllers/alunoController')
const autenticarToken = require("../Middleware/authMiddleware")

router.post('/', autenticarToken, alunoController.criar)
router.get('/', alunoController.listar)
router.get('/:id', alunoController.buscarPorId)
router.put('/:id', alunoController.atualizar)
router.delete('/:id', alunoController.deletar)

module.exports = router